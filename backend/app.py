import base64
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Set
from uuid import uuid4

from dotenv import dotenv_values, load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

LOGGER = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / "backend" / ".env", override=True)
load_dotenv(PROJECT_ROOT / ".env", override=True)
CONTACT_ENV_FILE = PROJECT_ROOT / "backend" / ".env"

AOSS_SVC_NAME = "aoss"
BEDROCK_EMBEDDING_MODEL_ID = "amazon.titan-embed-text-v2:0"
DEFAULT_TIMEOUT_AOSS = 100
DEFAULT_K = 3
DEFAULT_MODEL_ID = os.environ.get("BEDROCK_CHAT_MODEL_ID", "amazon.nova-micro-v1:0")
DEFAULT_POLLY_VOICE_ID = os.environ.get("POLLY_VOICE_ID", "Joanna")
DEFAULT_POLLY_ENGINE = os.environ.get("POLLY_ENGINE", "standard")
DEFAULT_POLLY_LANGUAGE_CODE = os.environ.get("POLLY_LANGUAGE_CODE", "en-US")
REQUIRED_RAG_ENV_VARS = ["AOSS_ID", "AOSS_AWS_REGION", "AOSS_INDEX_NAME"]
REQUIRED_CONTACT_ENV_VARS = ["CONTACT_DDB_TABLE", "CONTACT_EMAIL_FROM", "CONTACT_EMAIL_TO", "CONTACT_SMS_TO"]


class RagConfig(BaseModel):
    knowledgeBaseId: Optional[str] = None
    modelId: Optional[str] = None
    topK: Optional[int] = None
    systemPrompt: Optional[str] = None
    speechEnabled: Optional[bool] = None
    voiceId: Optional[str] = None
    engine: Optional[str] = None
    languageCode: Optional[str] = None


class RagRequest(BaseModel):
    sector: Optional[str] = None
    question: str = Field(min_length=1)
    config: RagConfig = Field(default_factory=RagConfig)


class RagSource(BaseModel):
    title: str
    uri: str
    excerpt: str


class RagSpeech(BaseModel):
    enabled: bool
    format: str = "mp3"
    voiceId: str
    engine: str
    languageCode: str
    audioBase64: Optional[str] = None


class RagResponse(BaseModel):
    answer: str
    sources: List[RagSource]
    speech: RagSpeech


class ContactSubmissionRequest(BaseModel):
    firstName: str = Field(min_length=1)
    lastName: str = Field(min_length=1)
    emailAddress: str = Field(min_length=1)
    phoneNumber: str = Field(min_length=1)
    organization: str = Field(min_length=1)
    request: str = Field(min_length=1)


class ContactSubmissionResponse(BaseModel):
    status: str
    submissionId: str
    emailSent: bool
    smsSent: bool
    errors: List[str] = Field(default_factory=list)


class SpeechSynthesisRequest(BaseModel):
    text: str = Field(min_length=1)
    voiceId: Optional[str] = None
    engine: Optional[str] = None
    languageCode: Optional[str] = None


class SpeechSynthesisResponse(BaseModel):
    format: str = "mp3"
    voiceId: str
    engine: str
    languageCode: str
    audioMimeType: str = "audio/mpeg"
    audioBase64: str


app = FastAPI(title="Ibis Equity RAG Backend", version="1.0.0")
allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:4200").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _required_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"{name} environment variable is required")
    return value


def _aws_session():
    import boto3

    profile = (os.environ.get("AWS_PROFILE") or "").strip()
    profile_candidates: List[Optional[str]] = []
    if profile:
        profile_candidates.append(profile)
    if profile != "default":
        profile_candidates.append("default")
    profile_candidates.append(None)

    last_session = None
    for candidate in profile_candidates:
        try:
            session = boto3.Session(profile_name=candidate) if candidate else boto3.Session()
        except Exception:
            continue
        last_session = session
        if session.get_credentials():
            return session

    return last_session or boto3.Session()


def _missing_required_rag_env_vars() -> List[str]:
    return [name for name in REQUIRED_RAG_ENV_VARS if not os.environ.get(name)]


def _contact_env_value(name: str, default: str = "") -> str:
    process_value = (os.environ.get(name) or "").strip()
    if process_value:
        return process_value

    file_values = dotenv_values(CONTACT_ENV_FILE)
    file_value = str(file_values.get(name) or "").strip()
    if file_value:
        return file_value

    return default


def _required_contact_env(name: str) -> str:
    value = _contact_env_value(name)
    if not value:
        raise RuntimeError(f"{name} environment variable is required")
    return value


def _missing_required_contact_env_vars() -> List[str]:
    return [name for name in REQUIRED_CONTACT_ENV_VARS if not _contact_env_value(name)]


def _resolve_aws_region() -> str:
    region_candidates = [
        os.environ.get("AWS_REGION"),
        os.environ.get("AWS_DEFAULT_REGION"),
        os.environ.get("AOSS_AWS_REGION"),
    ]
    for region in region_candidates:
        candidate = (region or "").strip()
        if candidate:
            return candidate

    raise RuntimeError("AWS region is required. Set AWS_REGION or AWS_DEFAULT_REGION.")


def _store_contact_submission(submission_id: str, created_at: str, payload: ContactSubmissionRequest) -> None:
    import boto3

    session = _aws_session()
    region = _resolve_aws_region()
    table_name = _required_contact_env("CONTACT_DDB_TABLE")
    partition_key_name = _contact_env_value("CONTACT_DDB_PK_NAME", "submissionId")
    sort_key_name = _contact_env_value("CONTACT_DDB_SK_NAME")

    ddb = session.resource("dynamodb", region_name=region)
    table = ddb.Table(table_name)

    item: Dict[str, str] = {
        partition_key_name: submission_id,
        "createdAt": created_at,
        "firstName": payload.firstName.strip(),
        "lastName": payload.lastName.strip(),
        "emailAddress": payload.emailAddress.strip(),
        "phoneNumber": payload.phoneNumber.strip(),
        "organization": payload.organization.strip(),
        "request": payload.request.strip(),
        "source": "ibis-equity-site",
    }
    if sort_key_name:
        item[sort_key_name] = created_at

    table.put_item(Item=item)


def _send_contact_email(submission_id: str, created_at: str, payload: ContactSubmissionRequest) -> bool:
    import boto3

    session = _aws_session()
    region = _resolve_aws_region()
    email_from = _required_contact_env("CONTACT_EMAIL_FROM")
    email_to = _required_contact_env("CONTACT_EMAIL_TO")

    ses = session.client("ses", region_name=region)

    subject = f"New Contact Request: {payload.firstName.strip()} {payload.lastName.strip()}"
    body = (
        "A new Contact Us request was submitted.\n\n"
        f"Submission ID: {submission_id}\n"
        f"Created At (UTC): {created_at}\n"
        f"First Name: {payload.firstName.strip()}\n"
        f"Last Name: {payload.lastName.strip()}\n"
        f"Email Address: {payload.emailAddress.strip()}\n"
        f"Phone Number: {payload.phoneNumber.strip()}\n"
        f"Organization: {payload.organization.strip()}\n"
        f"Request: {payload.request.strip()}\n"
    )

    ses.send_email(
        Source=email_from,
        Destination={"ToAddresses": [email_to]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": body}},
        },
    )
    return True


def _send_contact_sms(submission_id: str, payload: ContactSubmissionRequest) -> bool:
    import boto3

    session = _aws_session()
    region = _resolve_aws_region()
    sms_to = _required_contact_env("CONTACT_SMS_TO")

    sns = session.client("sns", region_name=region)
    message = (
        "Ibis Equity Contact processed. "
        f"ID: {submission_id}. "
        f"From: {payload.firstName.strip()} {payload.lastName.strip()} ({payload.organization.strip()})."
    )

    sns.publish(PhoneNumber=sms_to, Message=message)
    return True


def _resolve_knowledge_base_id(requested_id: str) -> str:
    kb_id = (requested_id or "").strip()
    if not kb_id:
        return ""

    # AWS Bedrock KB IDs are typically short alphanumeric IDs. If caller sent a
    # project alias like "kb-data-sciences", resolve via environment mapping.
    if kb_id.startswith("kb-"):
        alias_env = f"KB_{kb_id[3:].replace('-', '_').upper()}_ID"
        mapped = (os.environ.get(alias_env) or "").strip()
        if mapped:
            return mapped
        fallback = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip()
        if fallback:
            return fallback

    return kb_id


def _configured_kb_alias_mappings() -> Dict[str, str]:
    mappings: Dict[str, str] = {}
    for key, value in os.environ.items():
        if key.startswith("KB_") and key.endswith("_ID") and value.strip():
            alias = f"kb-{key[3:-3].lower().replace('_', '-')}"
            mappings[alias] = value.strip()
    return dict(sorted(mappings.items(), key=lambda item: item[0]))


def _synthesize_speech(answer: str, region: str, voice_id: str, engine: str, language_code: str) -> str:
    import boto3

    if not answer:
        return ""

    session = _aws_session()
    client = session.client("polly", region_name=region)
    request: Dict[str, Any] = {
        "Text": answer[:2800],
        "OutputFormat": "mp3",
        "VoiceId": voice_id,
    }
    if engine:
        request["Engine"] = engine
    if language_code:
        request["LanguageCode"] = language_code

    response = client.synthesize_speech(**request)
    audio_stream = response.get("AudioStream")
    if not audio_stream:
        return ""

    try:
        audio_bytes = audio_stream.read()
    finally:
        audio_stream.close()

    return base64.b64encode(audio_bytes).decode("utf-8")


def _generate_answer_from_context(question: str, context_chunks: List[str], region: str, model_id: str, system_prompt: str) -> str:
    from langchain_aws import ChatBedrockConverse
    from langchain_core.messages import HumanMessage, SystemMessage

    llm = ChatBedrockConverse(
        region_name=region,
        model=model_id,
        temperature=0.3,
        max_tokens=400,
    )

    context_text = "\n\n".join(chunk for chunk in context_chunks if chunk.strip())
    prompt = (
        "You are a grounded enterprise AI assistant. "
        "Use only the provided context to answer the question. "
        "If the answer is not in context, answer exactly: don't know.\n\n"
        f"Domain guidance: {system_prompt}\n\n"
        "Context:\n"
        f"{context_text}\n\n"
        "Question:\n"
        f"{question}"
    )

    response = llm.invoke([
        SystemMessage(content="Grounded QA mode"),
        HumanMessage(content=prompt),
    ])
    return str(response.content or "").strip()


def _extract_kb_sources(retrieval_results: List[Dict[str, Any]]) -> List[RagSource]:
    sources: List[RagSource] = []
    seen: Set[str] = set()

    for result in retrieval_results:
        location = result.get("location") or {}
        content = result.get("content") or {}
        source_uri = (
            (location.get("s3Location") or {}).get("uri")
            or (location.get("webLocation") or {}).get("url")
            or (location.get("confluenceLocation") or {}).get("url")
            or (location.get("salesforceLocation") or {}).get("url")
            or ""
        )
        title = Path(source_uri).name if source_uri else "Reference"
        excerpt = str(content.get("text") or "")[:220]

        dedupe_key = f"{source_uri}|{excerpt}"
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)
        sources.append(
            RagSource(
                title=title,
                uri=source_uri,
                excerpt=excerpt,
            )
        )

    return sources


def _query_bedrock_knowledge_base(
    question: str,
    knowledge_base_id: str,
    region: str,
    model_id: str,
    top_k: int,
    system_prompt: str,
) -> Dict[str, Any]:
    import boto3

    session = _aws_session()
    client = session.client("bedrock-agent-runtime", region_name=region)

    response = client.retrieve(
        knowledgeBaseId=knowledge_base_id,
        retrievalQuery={"text": question},
        retrievalConfiguration={
            "vectorSearchConfiguration": {
                "numberOfResults": max(top_k, 1),
            }
        },
    )

    retrieval_results = list(response.get("retrievalResults") or [])
    context_chunks = [str((item.get("content") or {}).get("text") or "") for item in retrieval_results]
    answer = _generate_answer_from_context(question, context_chunks, region, model_id, system_prompt)

    return {
        "answer": answer,
        "sources": _extract_kb_sources(retrieval_results),
    }


def _build_chain(host: str, index_name: str, region: str, model_id: str, top_k: int, system_prompt: str):
    import importlib
    import boto3
    from langchain_aws import BedrockEmbeddings, ChatBedrockConverse
    from langchain_community.vectorstores import OpenSearchVectorSearch
    from langchain_core.prompts import PromptTemplate
    from opensearchpy import AWSV4SignerAuth, RequestsHttpConnection

    # Resolve ConversationalRetrievalChain across LangChain module layout changes.
    chain_module = None
    for module_name in ("langchain_classic.chains", "langchain.chains"):
        try:
            chain_module = importlib.import_module(module_name)
            break
        except ModuleNotFoundError:
            continue
    if chain_module is None:
        raise ModuleNotFoundError(
            "Could not import ConversationalRetrievalChain from langchain_classic or langchain."
        )
    ConversationalRetrievalChain = chain_module.ConversationalRetrievalChain

    session = _aws_session()
    credentials = session.get_credentials()
    if not credentials:
        raise RuntimeError(
            "AWS credentials not found. Run 'aws sso login' and set AWS_PROFILE if needed."
        )

    llm = ChatBedrockConverse(
        region_name=region,
        model=model_id,
        temperature=0.3,
        max_tokens=400,
    )

    embeddings = BedrockEmbeddings(region_name=region, model_id=BEDROCK_EMBEDDING_MODEL_ID)

    vector_store = OpenSearchVectorSearch(
        f"https://{host}",
        index_name,
        embeddings,
        http_auth=AWSV4SignerAuth(credentials, region, AOSS_SVC_NAME),
        timeout=DEFAULT_TIMEOUT_AOSS,
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection,
    )
    retriever = vector_store.as_retriever(search_kwargs={"k": max(top_k, 1)})

    qa_prompt = PromptTemplate(
        template=f"""Human: This is a friendly conversation between a human and an AI.
The AI is talkative and provides specific details from its context but limits it to 240 tokens.
If the AI does not know the answer to a question, it truthfully says it does not know.

Assistant: OK, got it, I'll be a talkative truthful AI assistant.

Human: Here are a few documents in <documents> tags:
<documents>
{{context}}
</documents>
Based on the above documents, provide a detailed answer for, {{question}}
Answer \"don't know\" if not present in the document.

Domain guidance: {system_prompt}

Assistant:
""",
        input_variables=["context", "question"],
    )

    condense_prompt = PromptTemplate.from_template(
        """{chat_history}
Human: Rephrase the follow-up into a standalone question.
Follow Up Question: {question}
Standalone Question:
Assistant:"""
    )

    return ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        condense_question_prompt=condense_prompt,
        return_source_documents=True,
        combine_docs_chain_kwargs={"prompt": qa_prompt},
        verbose=False,
    )


def _extract_sources(source_documents: List[Any]) -> List[RagSource]:
    sources: List[RagSource] = []
    seen: Set[str] = set()

    for doc in source_documents:
        source_uri = str(doc.metadata.get("source", ""))
        if source_uri in seen:
            continue
        seen.add(source_uri)
        sources.append(
            RagSource(
                title=source_uri.split("/")[-1] if source_uri else "Reference",
                uri=source_uri,
                excerpt=str(doc.page_content or "")[:220],
            )
        )

    return sources


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/health/config")
def health_config() -> Dict[str, Any]:
    missing = _missing_required_rag_env_vars()
    return {
        "status": "ok" if not missing else "degraded",
        "requiredEnvVars": REQUIRED_RAG_ENV_VARS,
        "missingRequiredEnvVars": missing,
        "ready": len(missing) == 0,
    }


@app.get("/health/kb")
def health_kb(knowledgeBaseId: Optional[str] = None) -> Dict[str, Any]:
    requested = (knowledgeBaseId or "").strip()
    fallback_kb_id = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip()
    resolved = _resolve_knowledge_base_id(requested) if requested else ""

    return {
        "status": "ok",
        "requestedKnowledgeBaseId": requested,
        "resolvedKnowledgeBaseId": resolved,
        "usedFallbackKnowledgeBaseId": bool(requested and fallback_kb_id and resolved == fallback_kb_id and requested != fallback_kb_id),
        "defaultKnowledgeBaseIdConfigured": bool(fallback_kb_id),
        "configuredAliasMappings": _configured_kb_alias_mappings(),
        "hint": "Provide ?knowledgeBaseId=kb-data-sciences (or AWS KB ID) to validate runtime resolution.",
    }


@app.post("/api/contact/submit", response_model=ContactSubmissionResponse)
def submit_contact(request: ContactSubmissionRequest) -> ContactSubmissionResponse:
    try:
        if not _contact_env_value("CONTACT_DDB_TABLE"):
            raise RuntimeError("Missing contact environment variable: CONTACT_DDB_TABLE")

        submission_id = str(uuid4())
        created_at = datetime.now(timezone.utc).isoformat()

        _store_contact_submission(submission_id, created_at, request)
        email_sent = False
        sms_sent = False
        errors: List[str] = []

        try:
            email_sent = _send_contact_email(submission_id, created_at, request)
        except Exception as exc:
            LOGGER.exception("Contact email notification failed")
            errors.append(f"email: {str(exc).strip() or 'failed to send'}")

        try:
            sms_sent = _send_contact_sms(submission_id, request)
        except Exception as exc:
            LOGGER.exception("Contact SMS notification failed")
            errors.append(f"sms: {str(exc).strip() or 'failed to send'}")

        status = "processed" if not errors else "processed_with_warnings"

        return ContactSubmissionResponse(
            status=status,
            submissionId=submission_id,
            emailSent=email_sent,
            smsSent=sms_sent,
            errors=errors,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        LOGGER.exception("Unhandled error in submit_contact")
        detail = str(exc).strip() or "Internal server error"
        raise HTTPException(status_code=500, detail=detail) from exc


@app.post("/api/speech/synthesize", response_model=SpeechSynthesisResponse)
def synthesize_speech(request: SpeechSynthesisRequest) -> SpeechSynthesisResponse:
    try:
        text = request.text.strip()
        if not text:
            raise HTTPException(status_code=400, detail="text is required")

        region = _resolve_aws_region()
        voice_id = (request.voiceId or DEFAULT_POLLY_VOICE_ID).strip() or DEFAULT_POLLY_VOICE_ID
        engine = (request.engine or DEFAULT_POLLY_ENGINE).strip() or DEFAULT_POLLY_ENGINE
        language_code = (request.languageCode or DEFAULT_POLLY_LANGUAGE_CODE).strip() or DEFAULT_POLLY_LANGUAGE_CODE

        audio_base64 = _synthesize_speech(text, region, voice_id, engine, language_code)
        if not audio_base64:
            raise HTTPException(status_code=502, detail="Polly returned no audio stream")

        return SpeechSynthesisResponse(
            voiceId=voice_id,
            engine=engine,
            languageCode=language_code,
            audioBase64=audio_base64,
        )
    except HTTPException:
        raise
    except Exception as exc:
        LOGGER.exception("Unhandled error in synthesize_speech")
        detail = str(exc).strip() or "Unable to synthesize speech"
        raise HTTPException(status_code=500, detail=detail) from exc


@app.post("/api/bedrock/rag/query", response_model=RagResponse)
def rag_query(request: RagRequest) -> RagResponse:
    try:
        question = request.question.strip()
        if not question:
            raise HTTPException(status_code=400, detail="question is required")

        config = request.config
        model_id = (config.modelId or DEFAULT_MODEL_ID).strip()
        top_k = config.topK if config.topK is not None else DEFAULT_K
        system_prompt = (config.systemPrompt or "Provide clear, grounded recommendations.").strip()
        knowledge_base_id = _resolve_knowledge_base_id(config.knowledgeBaseId or "")
        speech_enabled = config.speechEnabled if config.speechEnabled is not None else True
        voice_id = (config.voiceId or DEFAULT_POLLY_VOICE_ID).strip()
        engine = (config.engine or DEFAULT_POLLY_ENGINE).strip()
        language_code = (config.languageCode or DEFAULT_POLLY_LANGUAGE_CODE).strip()

        aoss_id = _required_env("AOSS_ID")
        aoss_region = _required_env("AOSS_AWS_REGION")
        index_name = _required_env("AOSS_INDEX_NAME")
        host = f"{aoss_id}.{aoss_region}.{AOSS_SVC_NAME}.amazonaws.com:443"

        if knowledge_base_id:
            try:
                kb_result = _query_bedrock_knowledge_base(
                    question=question,
                    knowledge_base_id=knowledge_base_id,
                    region=aoss_region,
                    model_id=model_id,
                    top_k=top_k,
                    system_prompt=system_prompt,
                )
                answer = str(kb_result.get("answer", ""))
                sources = list(kb_result.get("sources", []))
            except Exception:
                LOGGER.exception("Knowledge base retrieval failed for %s; falling back to OpenSearch", knowledge_base_id)
                chain = _build_chain(host, index_name, aoss_region, model_id, top_k, system_prompt)
                try:
                    result = chain({"question": question, "chat_history": []})
                except Exception as model_exc:
                    # If caller supplied an invalid model id, retry with backend default model.
                    invalid_model = "provided model identifier is invalid" in str(model_exc).lower()
                    fallback_model = DEFAULT_MODEL_ID.strip()
                    if invalid_model and fallback_model and fallback_model != model_id:
                        LOGGER.warning("Model '%s' is invalid; retrying with fallback '%s'", model_id, fallback_model)
                        fallback_chain = _build_chain(host, index_name, aoss_region, fallback_model, top_k, system_prompt)
                        result = fallback_chain({"question": question, "chat_history": []})
                    else:
                        raise
                answer = str(result.get("answer", ""))
                source_documents = list(result.get("source_documents", []))
                sources = _extract_sources(source_documents)
        else:
            chain = _build_chain(host, index_name, aoss_region, model_id, top_k, system_prompt)
            try:
                result = chain({"question": question, "chat_history": []})
            except Exception as model_exc:
                # If caller supplied an invalid model id, retry with backend default model.
                invalid_model = "provided model identifier is invalid" in str(model_exc).lower()
                fallback_model = DEFAULT_MODEL_ID.strip()
                if invalid_model and fallback_model and fallback_model != model_id:
                    LOGGER.warning("Model '%s' is invalid; retrying with fallback '%s'", model_id, fallback_model)
                    fallback_chain = _build_chain(host, index_name, aoss_region, fallback_model, top_k, system_prompt)
                    result = fallback_chain({"question": question, "chat_history": []})
                else:
                    raise
            answer = str(result.get("answer", ""))
            source_documents = list(result.get("source_documents", []))
            sources = _extract_sources(source_documents)

        speech = RagSpeech(
            enabled=speech_enabled,
            voiceId=voice_id,
            engine=engine,
            languageCode=language_code,
        )
        if speech_enabled:
            try:
                speech.audioBase64 = _synthesize_speech(answer, aoss_region, voice_id, engine, language_code)
            except Exception:
                LOGGER.exception("Polly synthesis failed")

        return RagResponse(answer=answer, sources=sources, speech=speech)
    except HTTPException:
        raise
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        LOGGER.exception("Unhandled error in rag_query")
        detail = str(exc).strip() or "Internal server error"
        raise HTTPException(status_code=500, detail=detail) from exc
