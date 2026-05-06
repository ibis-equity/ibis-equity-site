# backend/app.py Line-by-Line Explanation

This document explains each line in backend/app.py in order.

| Line | Code | Explanation |
|---:|---|---|
| 1 | import base64 | Imports a module dependency used later in the implementation. |
| 2 | import logging | Imports a module dependency used later in the implementation. |
| 3 | import os | Imports a module dependency used later in the implementation. |
| 4 | import re | Imports a module dependency used later in the implementation. |
| 5 | from datetime import datetime, timezone | Imports specific symbols from another module for use in this file. |
| 6 | from pathlib import Path | Imports specific symbols from another module for use in this file. |
| 7 | from typing import Any, Dict, List, Optional, Set, Tuple | Imports specific symbols from another module for use in this file. |
| 8 | from uuid import uuid4 | Imports specific symbols from another module for use in this file. |
| 9 | (blank) | Blank spacer line used for readability. |
| 10 | from dotenv import dotenv_values, load_dotenv | Imports specific symbols from another module for use in this file. |
| 11 | from fastapi import FastAPI, HTTPException | Imports specific symbols from another module for use in this file. |
| 12 | from fastapi.middleware.cors import CORSMiddleware | Imports specific symbols from another module for use in this file. |
| 13 | from pydantic import BaseModel, Field | Imports specific symbols from another module for use in this file. |
| 14 | (blank) | Blank spacer line used for readability. |
| 15 | LOGGER = logging.getLogger(__name__) | Defines a module-level constant or configuration default. |
| 16 | (blank) | Blank spacer line used for readability. |
| 17 | PROJECT_ROOT = Path(__file__).resolve().parent.parent | Defines a module-level constant or configuration default. |
| 18 | load_dotenv(PROJECT_ROOT / "backend" / ".env", override=True) | Invokes a function or method to perform an operation. |
| 19 | load_dotenv(PROJECT_ROOT / ".env", override=True) | Invokes a function or method to perform an operation. |
| 20 | CONTACT_ENV_FILE = PROJECT_ROOT / "backend" / ".env" | Defines a module-level constant or configuration default. |
| 21 | (blank) | Blank spacer line used for readability. |
| 22 | AOSS_SVC_NAME = "aoss" | Defines a module-level constant or configuration default. |
| 23 | BEDROCK_EMBEDDING_MODEL_ID = "amazon.titan-embed-text-v2:0" | Defines a module-level constant or configuration default. |
| 24 | DEFAULT_TIMEOUT_AOSS = 100 | Defines a module-level constant or configuration default. |
| 25 | DEFAULT_K = 3 | Defines a module-level constant or configuration default. |
| 26 | DEFAULT_MODEL_ID = os.environ.get("BEDROCK_CHAT_MODEL_ID", "amazon.nova-micro-v1:0") | Defines a module-level constant or configuration default. |
| 27 | DEFAULT_POLLY_VOICE_ID = os.environ.get("POLLY_VOICE_ID", "Joanna") | Defines a module-level constant or configuration default. |
| 28 | DEFAULT_POLLY_ENGINE = os.environ.get("POLLY_ENGINE", "standard") | Defines a module-level constant or configuration default. |
| 29 | DEFAULT_POLLY_LANGUAGE_CODE = os.environ.get("POLLY_LANGUAGE_CODE", "en-US") | Defines a module-level constant or configuration default. |
| 30 | REQUIRED_RAG_ENV_VARS = ["AOSS_ID", "AOSS_AWS_REGION", "AOSS_INDEX_NAME"] | Defines a module-level constant or configuration default. |
| 31 | REQUIRED_CONTACT_ENV_VARS = ["CONTACT_DDB_TABLE", "CONTACT_EMAIL_FROM", "CONTACT_EMAIL_TO", "CONTACT_SMS_TO"] | Defines a module-level constant or configuration default. |
| 32 | (blank) | Blank spacer line used for readability. |
| 33 | (blank) | Blank spacer line used for readability. |
| 34 | class RagConfig(BaseModel): | Declares class RagConfig, used as a typed data contract or helper container. |
| 35 |     knowledgeBaseId: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 36 |     modelId: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 37 |     topK: Optional[int] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 38 |     systemPrompt: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 39 |     speechEnabled: Optional[bool] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 40 |     voiceId: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 41 |     engine: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 42 |     languageCode: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 43 | (blank) | Blank spacer line used for readability. |
| 44 | (blank) | Blank spacer line used for readability. |
| 45 | class RagRequest(BaseModel): | Declares class RagRequest, used as a typed data contract or helper container. |
| 46 |     sector: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 47 |     question: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 48 |     config: RagConfig = Field(default_factory=RagConfig) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 49 | (blank) | Blank spacer line used for readability. |
| 50 | (blank) | Blank spacer line used for readability. |
| 51 | class RagSource(BaseModel): | Declares class RagSource, used as a typed data contract or helper container. |
| 52 |     title: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 53 |     uri: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 54 |     excerpt: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 55 |     imageUri: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 56 |     imageUrl: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 57 | (blank) | Blank spacer line used for readability. |
| 58 | (blank) | Blank spacer line used for readability. |
| 59 | class RagSpeech(BaseModel): | Declares class RagSpeech, used as a typed data contract or helper container. |
| 60 |     enabled: bool | Participates in the surrounding expression, object literal, or control-flow structure. |
| 61 |     format: str = "mp3" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 62 |     voiceId: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 63 |     engine: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 64 |     languageCode: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 65 |     audioBase64: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 66 | (blank) | Blank spacer line used for readability. |
| 67 | (blank) | Blank spacer line used for readability. |
| 68 | class RagResponse(BaseModel): | Declares class RagResponse, used as a typed data contract or helper container. |
| 69 |     answer: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 70 |     sources: List[RagSource] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 71 |     speech: RagSpeech | Participates in the surrounding expression, object literal, or control-flow structure. |
| 72 | (blank) | Blank spacer line used for readability. |
| 73 | (blank) | Blank spacer line used for readability. |
| 74 | class ContactSubmissionRequest(BaseModel): | Declares class ContactSubmissionRequest, used as a typed data contract or helper container. |
| 75 |     firstName: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 76 |     lastName: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 77 |     emailAddress: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 78 |     phoneNumber: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 79 |     organization: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 80 |     position: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 81 |     request: str = Field(min_length=1, max_length=2000) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 82 | (blank) | Blank spacer line used for readability. |
| 83 | (blank) | Blank spacer line used for readability. |
| 84 | class ContactSubmissionResponse(BaseModel): | Declares class ContactSubmissionResponse, used as a typed data contract or helper container. |
| 85 |     status: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 86 |     submissionId: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 87 |     emailSent: bool | Participates in the surrounding expression, object literal, or control-flow structure. |
| 88 |     smsSent: bool | Participates in the surrounding expression, object literal, or control-flow structure. |
| 89 |     errors: List[str] = Field(default_factory=list) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 90 | (blank) | Blank spacer line used for readability. |
| 91 | (blank) | Blank spacer line used for readability. |
| 92 | class SpeechSynthesisRequest(BaseModel): | Declares class SpeechSynthesisRequest, used as a typed data contract or helper container. |
| 93 |     text: str = Field(min_length=1) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 94 |     voiceId: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 95 |     engine: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 96 |     languageCode: Optional[str] = None | Participates in the surrounding expression, object literal, or control-flow structure. |
| 97 | (blank) | Blank spacer line used for readability. |
| 98 | (blank) | Blank spacer line used for readability. |
| 99 | class SpeechSynthesisResponse(BaseModel): | Declares class SpeechSynthesisResponse, used as a typed data contract or helper container. |
| 100 |     format: str = "mp3" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 101 |     voiceId: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 102 |     engine: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 103 |     languageCode: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 104 |     audioMimeType: str = "audio/mpeg" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 105 |     audioBase64: str | Participates in the surrounding expression, object literal, or control-flow structure. |
| 106 | (blank) | Blank spacer line used for readability. |
| 107 | (blank) | Blank spacer line used for readability. |
| 108 | app = FastAPI(title="Ibis Equity RAG Backend", version="1.0.0") | Defines a module-level constant or configuration default. |
| 109 | allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:4200").split(",") | Defines a module-level constant or configuration default. |
| 110 | app.add_middleware( | Adds middleware to the FastAPI app to apply cross-cutting request/response behavior. |
| 111 |     CORSMiddleware, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 112 |     allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()], | Defines a module-level constant or configuration default. |
| 113 |     allow_credentials=True, | Defines a module-level constant or configuration default. |
| 114 |     allow_methods=["*"], | Defines a module-level constant or configuration default. |
| 115 |     allow_headers=["*"], | Defines a module-level constant or configuration default. |
| 116 | ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 117 | (blank) | Blank spacer line used for readability. |
| 118 | (blank) | Blank spacer line used for readability. |
| 119 | def _required_env(name: str) -> str: | Defines function _required_env, which encapsulates a reusable behavior block. |
| 120 |     value = os.environ.get(name) | Defines a module-level constant or configuration default. |
| 121 |     if not value: | Starts a conditional branch that executes only when the condition is true. |
| 122 |         raise RuntimeError(f"{name} environment variable is required") | Raises an exception to signal an error condition to the caller. |
| 123 |     return value | Returns a value to the caller and exits the current function. |
| 124 | (blank) | Blank spacer line used for readability. |
| 125 | (blank) | Blank spacer line used for readability. |
| 126 | def _is_expired_aws_token_error(exc: Exception) -> bool: | Defines function _is_expired_aws_token_error, which encapsulates a reusable behavior block. |
| 127 |     current: Optional[BaseException] = exc | Participates in the surrounding expression, object literal, or control-flow structure. |
| 128 |     visited: Set[int] = set() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 129 | (blank) | Blank spacer line used for readability. |
| 130 |     while current and id(current) not in visited: | Starts a loop that repeats while the condition remains true. |
| 131 |         visited.add(id(current)) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 132 |         message = str(current).lower() | Defines a module-level constant or configuration default. |
| 133 |         if ( | Starts a conditional branch that executes only when the condition is true. |
| 134 |             "expiredtokenexception" in message | Participates in the surrounding expression, object literal, or control-flow structure. |
| 135 |             or "expired token" in message | Participates in the surrounding expression, object literal, or control-flow structure. |
| 136 |             or "security token included in the request is expired" in message | Participates in the surrounding expression, object literal, or control-flow structure. |
| 137 |             or "token has expired" in message | Participates in the surrounding expression, object literal, or control-flow structure. |
| 138 |         ): | Participates in the surrounding expression, object literal, or control-flow structure. |
| 139 |             return True | Returns a value to the caller and exits the current function. |
| 140 | (blank) | Blank spacer line used for readability. |
| 141 |         current = getattr(current, "__cause__", None) or getattr(current, "__context__", None) | Defines a module-level constant or configuration default. |
| 142 | (blank) | Blank spacer line used for readability. |
| 143 |     return False | Returns a value to the caller and exits the current function. |
| 144 | (blank) | Blank spacer line used for readability. |
| 145 | (blank) | Blank spacer line used for readability. |
| 146 | def _aws_session(): | Defines function _aws_session, which encapsulates a reusable behavior block. |
| 147 |     import boto3 | Imports a module dependency used later in the implementation. |
| 148 | (blank) | Blank spacer line used for readability. |
| 149 |     profile = (os.environ.get("AWS_PROFILE") or "").strip() | Defines a module-level constant or configuration default. |
| 150 |     profile_candidates: List[Optional[str]] = [] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 151 |     if profile: | Starts a conditional branch that executes only when the condition is true. |
| 152 |         profile_candidates.append(profile) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 153 |     if profile != "default": | Starts a conditional branch that executes only when the condition is true. |
| 154 |         profile_candidates.append("default") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 155 |     profile_candidates.append(None) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 156 | (blank) | Blank spacer line used for readability. |
| 157 |     last_session = None | Defines a module-level constant or configuration default. |
| 158 |     for candidate in profile_candidates: | Starts a loop that iterates over a sequence of values. |
| 159 |         try: | Begins an exception-handling block for risky operations. |
| 160 |             session = boto3.Session(profile_name=candidate) if candidate else boto3.Session() | Defines a module-level constant or configuration default. |
| 161 |         except Exception: | Handles a specific exception type raised by the preceding try block. |
| 162 |             continue | Skips the rest of the current loop iteration and moves to the next item. |
| 163 |         last_session = session | Defines a module-level constant or configuration default. |
| 164 |         if session.get_credentials(): | Starts a conditional branch that executes only when the condition is true. |
| 165 |             return session | Returns a value to the caller and exits the current function. |
| 166 | (blank) | Blank spacer line used for readability. |
| 167 |     return last_session or boto3.Session() | Returns a value to the caller and exits the current function. |
| 168 | (blank) | Blank spacer line used for readability. |
| 169 | (blank) | Blank spacer line used for readability. |
| 170 | def _missing_required_rag_env_vars() -> List[str]: | Defines function _missing_required_rag_env_vars, which encapsulates a reusable behavior block. |
| 171 |     return [name for name in REQUIRED_RAG_ENV_VARS if not os.environ.get(name)] | Returns a value to the caller and exits the current function. |
| 172 | (blank) | Blank spacer line used for readability. |
| 173 | (blank) | Blank spacer line used for readability. |
| 174 | def _contact_env_value(name: str, default: str = "") -> str: | Defines function _contact_env_value, which encapsulates a reusable behavior block. |
| 175 |     process_value = (os.environ.get(name) or "").strip() | Defines a module-level constant or configuration default. |
| 176 |     if process_value: | Starts a conditional branch that executes only when the condition is true. |
| 177 |         return process_value | Returns a value to the caller and exits the current function. |
| 178 | (blank) | Blank spacer line used for readability. |
| 179 |     file_values = dotenv_values(CONTACT_ENV_FILE) | Defines a module-level constant or configuration default. |
| 180 |     file_value = str(file_values.get(name) or "").strip() | Defines a module-level constant or configuration default. |
| 181 |     if file_value: | Starts a conditional branch that executes only when the condition is true. |
| 182 |         return file_value | Returns a value to the caller and exits the current function. |
| 183 | (blank) | Blank spacer line used for readability. |
| 184 |     return default | Returns a value to the caller and exits the current function. |
| 185 | (blank) | Blank spacer line used for readability. |
| 186 | (blank) | Blank spacer line used for readability. |
| 187 | def _required_contact_env(name: str) -> str: | Defines function _required_contact_env, which encapsulates a reusable behavior block. |
| 188 |     value = _contact_env_value(name) | Defines a module-level constant or configuration default. |
| 189 |     if not value: | Starts a conditional branch that executes only when the condition is true. |
| 190 |         raise RuntimeError(f"{name} environment variable is required") | Raises an exception to signal an error condition to the caller. |
| 191 |     return value | Returns a value to the caller and exits the current function. |
| 192 | (blank) | Blank spacer line used for readability. |
| 193 | (blank) | Blank spacer line used for readability. |
| 194 | def _missing_required_contact_env_vars() -> List[str]: | Defines function _missing_required_contact_env_vars, which encapsulates a reusable behavior block. |
| 195 |     return [name for name in REQUIRED_CONTACT_ENV_VARS if not _contact_env_value(name)] | Returns a value to the caller and exits the current function. |
| 196 | (blank) | Blank spacer line used for readability. |
| 197 | (blank) | Blank spacer line used for readability. |
| 198 | def _resolve_aws_region() -> str: | Defines function _resolve_aws_region, which encapsulates a reusable behavior block. |
| 199 |     region_candidates = [ | Defines a module-level constant or configuration default. |
| 200 |         os.environ.get("AWS_REGION"), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 201 |         os.environ.get("AWS_DEFAULT_REGION"), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 202 |         os.environ.get("AOSS_AWS_REGION"), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 203 |     ] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 204 |     for region in region_candidates: | Starts a loop that iterates over a sequence of values. |
| 205 |         candidate = (region or "").strip() | Defines a module-level constant or configuration default. |
| 206 |         if candidate: | Starts a conditional branch that executes only when the condition is true. |
| 207 |             return candidate | Returns a value to the caller and exits the current function. |
| 208 | (blank) | Blank spacer line used for readability. |
| 209 |     raise RuntimeError("AWS region is required. Set AWS_REGION or AWS_DEFAULT_REGION.") | Raises an exception to signal an error condition to the caller. |
| 210 | (blank) | Blank spacer line used for readability. |
| 211 | (blank) | Blank spacer line used for readability. |
| 212 | def _store_contact_submission(submission_id: str, created_at: str, payload: ContactSubmissionRequest) -> None: | Defines function _store_contact_submission, which encapsulates a reusable behavior block. |
| 213 |     import boto3 | Imports a module dependency used later in the implementation. |
| 214 | (blank) | Blank spacer line used for readability. |
| 215 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 216 |     region = _resolve_aws_region() | Defines a module-level constant or configuration default. |
| 217 |     table_name = _required_contact_env("CONTACT_DDB_TABLE") | Defines a module-level constant or configuration default. |
| 218 |     partition_key_name = _contact_env_value("CONTACT_DDB_PK_NAME", "submissionId") | Defines a module-level constant or configuration default. |
| 219 |     sort_key_name = _contact_env_value("CONTACT_DDB_SK_NAME") | Defines a module-level constant or configuration default. |
| 220 | (blank) | Blank spacer line used for readability. |
| 221 |     ddb = session.resource("dynamodb", region_name=region) | Defines a module-level constant or configuration default. |
| 222 |     table = ddb.Table(table_name) | Defines a module-level constant or configuration default. |
| 223 | (blank) | Blank spacer line used for readability. |
| 224 |     item: Dict[str, str] = { | Participates in the surrounding expression, object literal, or control-flow structure. |
| 225 |         partition_key_name: submission_id, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 226 |         "createdAt": created_at, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 227 |         "firstName": payload.firstName.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 228 |         "lastName": payload.lastName.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 229 |         "emailAddress": payload.emailAddress.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 230 |         "phoneNumber": payload.phoneNumber.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 231 |         "organization": payload.organization.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 232 |         "request": payload.request.strip(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 233 |         "source": "ibis-equity-site", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 234 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 235 |     if sort_key_name: | Starts a conditional branch that executes only when the condition is true. |
| 236 |         item[sort_key_name] = created_at | Participates in the surrounding expression, object literal, or control-flow structure. |
| 237 | (blank) | Blank spacer line used for readability. |
| 238 |     table.put_item(Item=item) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 239 | (blank) | Blank spacer line used for readability. |
| 240 | (blank) | Blank spacer line used for readability. |
| 241 | def _send_contact_email(submission_id: str, created_at: str, payload: ContactSubmissionRequest) -> bool: | Defines function _send_contact_email, which encapsulates a reusable behavior block. |
| 242 |     import boto3 | Imports a module dependency used later in the implementation. |
| 243 | (blank) | Blank spacer line used for readability. |
| 244 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 245 |     region = _resolve_aws_region() | Defines a module-level constant or configuration default. |
| 246 |     email_from = _required_contact_env("CONTACT_EMAIL_FROM") | Defines a module-level constant or configuration default. |
| 247 |     email_to = _required_contact_env("CONTACT_EMAIL_TO") | Defines a module-level constant or configuration default. |
| 248 | (blank) | Blank spacer line used for readability. |
| 249 |     ses = session.client("ses", region_name=region) | Defines a module-level constant or configuration default. |
| 250 | (blank) | Blank spacer line used for readability. |
| 251 |     subject = f"New Contact Request: {payload.firstName.strip()} {payload.lastName.strip()}" | Defines a module-level constant or configuration default. |
| 252 |     body = ( | Defines a module-level constant or configuration default. |
| 253 |         "A new Contact Us request was submitted.\n\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 254 |         f"Submission ID: {submission_id}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 255 |         f"Created At (UTC): {created_at}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 256 |         f"First Name: {payload.firstName.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 257 |         f"Last Name: {payload.lastName.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 258 |         f"Email Address: {payload.emailAddress.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 259 |         f"Phone Number: {payload.phoneNumber.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 260 |         f"Organization: {payload.organization.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 261 |         f"Position: {payload.position.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 262 |         f"Request: {payload.request.strip()}\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 263 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 264 | (blank) | Blank spacer line used for readability. |
| 265 |     ses.send_email( | Participates in the surrounding expression, object literal, or control-flow structure. |
| 266 |         Source=email_from, | Defines a module-level constant or configuration default. |
| 267 |         Destination={"ToAddresses": [email_to]}, | Defines a module-level constant or configuration default. |
| 268 |         Message={ | Defines a module-level constant or configuration default. |
| 269 |             "Subject": {"Data": subject}, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 270 |             "Body": {"Text": {"Data": body}}, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 271 |         }, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 272 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 273 |     return True | Returns a value to the caller and exits the current function. |
| 274 | (blank) | Blank spacer line used for readability. |
| 275 | (blank) | Blank spacer line used for readability. |
| 276 | def _send_contact_sms(submission_id: str, payload: ContactSubmissionRequest) -> bool: | Defines function _send_contact_sms, which encapsulates a reusable behavior block. |
| 277 |     import boto3 | Imports a module dependency used later in the implementation. |
| 278 | (blank) | Blank spacer line used for readability. |
| 279 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 280 |     region = _resolve_aws_region() | Defines a module-level constant or configuration default. |
| 281 |     sms_to = _required_contact_env("CONTACT_SMS_TO") | Defines a module-level constant or configuration default. |
| 282 | (blank) | Blank spacer line used for readability. |
| 283 |     sns = session.client("sns", region_name=region) | Defines a module-level constant or configuration default. |
| 284 |     message = ( | Defines a module-level constant or configuration default. |
| 285 |         "Ibis Equity Contact processed. " | Participates in the surrounding expression, object literal, or control-flow structure. |
| 286 |         f"ID: {submission_id}. " | Participates in the surrounding expression, object literal, or control-flow structure. |
| 287 |         f"From: {payload.firstName.strip()} {payload.lastName.strip()} ({payload.organization.strip()}, {payload.position.strip()})." | Participates in the surrounding expression, object literal, or control-flow structure. |
| 288 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 289 | (blank) | Blank spacer line used for readability. |
| 290 |     sns.publish(PhoneNumber=sms_to, Message=message) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 291 |     return True | Returns a value to the caller and exits the current function. |
| 292 | (blank) | Blank spacer line used for readability. |
| 293 | (blank) | Blank spacer line used for readability. |
| 294 | def _resolve_knowledge_base_id(requested_id: str) -> str: | Defines function _resolve_knowledge_base_id, which encapsulates a reusable behavior block. |
| 295 |     kb_id = (requested_id or "").strip() | Defines a module-level constant or configuration default. |
| 296 |     if not kb_id: | Starts a conditional branch that executes only when the condition is true. |
| 297 |         return "" | Returns a value to the caller and exits the current function. |
| 298 | (blank) | Blank spacer line used for readability. |
| 299 |     # AWS Bedrock KB IDs are typically short alphanumeric IDs. If caller sent a | Comment line describing intent or behavior for the next block. |
| 300 |     # project alias like "kb-data-sciences", resolve via environment mapping. | Comment line describing intent or behavior for the next block. |
| 301 |     if kb_id.startswith("kb-"): | Starts a conditional branch that executes only when the condition is true. |
| 302 |         alias_env = f"KB_{kb_id[3:].replace('-', '_').upper()}_ID" | Defines a module-level constant or configuration default. |
| 303 |         mapped = (os.environ.get(alias_env) or "").strip() | Defines a module-level constant or configuration default. |
| 304 |         if mapped: | Starts a conditional branch that executes only when the condition is true. |
| 305 |             return mapped | Returns a value to the caller and exits the current function. |
| 306 |         fallback = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip() | Defines a module-level constant or configuration default. |
| 307 |         if fallback: | Starts a conditional branch that executes only when the condition is true. |
| 308 |             return fallback | Returns a value to the caller and exits the current function. |
| 309 |         # No alias mapping configured: skip KB API lookup and use OpenSearch flow directly. | Comment line describing intent or behavior for the next block. |
| 310 |         return "" | Returns a value to the caller and exits the current function. |
| 311 | (blank) | Blank spacer line used for readability. |
| 312 |     return kb_id | Returns a value to the caller and exits the current function. |
| 313 | (blank) | Blank spacer line used for readability. |
| 314 | (blank) | Blank spacer line used for readability. |
| 315 | def _configured_kb_alias_mappings() -> Dict[str, str]: | Defines function _configured_kb_alias_mappings, which encapsulates a reusable behavior block. |
| 316 |     mappings: Dict[str, str] = {} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 317 |     for key, value in os.environ.items(): | Starts a loop that iterates over a sequence of values. |
| 318 |         if key.startswith("KB_") and key.endswith("_ID") and value.strip(): | Starts a conditional branch that executes only when the condition is true. |
| 319 |             alias = f"kb-{key[3:-3].lower().replace('_', '-')}" | Defines a module-level constant or configuration default. |
| 320 |             mappings[alias] = value.strip() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 321 |     return dict(sorted(mappings.items(), key=lambda item: item[0])) | Returns a value to the caller and exits the current function. |
| 322 | (blank) | Blank spacer line used for readability. |
| 323 | (blank) | Blank spacer line used for readability. |
| 324 | def _frontend_kb_aliases() -> Set[str]: | Defines function _frontend_kb_aliases, which encapsulates a reusable behavior block. |
| 325 |     routes_file = PROJECT_ROOT / "src" / "app" / "app.routes.ts" | Defines a module-level constant or configuration default. |
| 326 |     if not routes_file.exists(): | Starts a conditional branch that executes only when the condition is true. |
| 327 |         return set() | Returns a value to the caller and exits the current function. |
| 328 | (blank) | Blank spacer line used for readability. |
| 329 |     try: | Begins an exception-handling block for risky operations. |
| 330 |         content = routes_file.read_text(encoding="utf-8") | Defines a module-level constant or configuration default. |
| 331 |     except Exception: | Handles a specific exception type raised by the preceding try block. |
| 332 |         LOGGER.exception("Unable to read frontend routes for KB alias validation") | Writes diagnostic information to application logs. |
| 333 |         return set() | Returns a value to the caller and exits the current function. |
| 334 | (blank) | Blank spacer line used for readability. |
| 335 |     aliases = { | Defines a module-level constant or configuration default. |
| 336 |         match.group(1).strip() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 337 |         for match in re.finditer(r"knowledgeBaseId\s*:\s*['\"]([^'\"]+)['\"]", content) | Starts a loop that iterates over a sequence of values. |
| 338 |         if match.group(1).strip().startswith("kb-") | Starts a conditional branch that executes only when the condition is true. |
| 339 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 340 |     return aliases | Returns a value to the caller and exits the current function. |
| 341 | (blank) | Blank spacer line used for readability. |
| 342 | (blank) | Blank spacer line used for readability. |
| 343 | def _log_missing_kb_alias_mappings() -> None: | Defines function _log_missing_kb_alias_mappings, which encapsulates a reusable behavior block. |
| 344 |     aliases = _frontend_kb_aliases() | Defines a module-level constant or configuration default. |
| 345 |     if not aliases: | Starts a conditional branch that executes only when the condition is true. |
| 346 |         return | Exits the current function without returning an explicit value. |
| 347 | (blank) | Blank spacer line used for readability. |
| 348 |     mapped_aliases = set(_configured_kb_alias_mappings().keys()) | Defines a module-level constant or configuration default. |
| 349 |     fallback = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip() | Defines a module-level constant or configuration default. |
| 350 |     missing = sorted(alias for alias in aliases if alias not in mapped_aliases and not fallback) | Defines a module-level constant or configuration default. |
| 351 | (blank) | Blank spacer line used for readability. |
| 352 |     if missing: | Starts a conditional branch that executes only when the condition is true. |
| 353 |         env_names = [f"KB_{alias[3:].replace('-', '_').upper()}_ID" for alias in missing] | Defines a module-level constant or configuration default. |
| 354 |         LOGGER.warning( | Writes diagnostic information to application logs. |
| 355 |             "Missing KB alias mappings for route aliases: %s. Set %s or BEDROCK_KNOWLEDGE_BASE_ID.", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 356 |             ", ".join(missing), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 357 |             ", ".join(env_names), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 358 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 359 | (blank) | Blank spacer line used for readability. |
| 360 | (blank) | Blank spacer line used for readability. |
| 361 | def _kb_alias_mapping_health() -> Dict[str, Any]: | Defines function _kb_alias_mapping_health, which encapsulates a reusable behavior block. |
| 362 |     route_aliases = sorted(_frontend_kb_aliases()) | Defines a module-level constant or configuration default. |
| 363 |     configured_mappings = _configured_kb_alias_mappings() | Defines a module-level constant or configuration default. |
| 364 |     fallback = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip() | Defines a module-level constant or configuration default. |
| 365 |     missing_aliases = [alias for alias in route_aliases if alias not in configured_mappings and not fallback] | Defines a module-level constant or configuration default. |
| 366 |     missing_env_vars = [f"KB_{alias[3:].replace('-', '_').upper()}_ID" for alias in missing_aliases] | Defines a module-level constant or configuration default. |
| 367 | (blank) | Blank spacer line used for readability. |
| 368 |     return { | Returns a value to the caller and exits the current function. |
| 369 |         "routeAliasesDetected": route_aliases, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 370 |         "missingRouteAliases": missing_aliases, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 371 |         "missingAliasEnvVars": missing_env_vars, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 372 |         "fallbackKnowledgeBaseIdConfigured": bool(fallback), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 373 |         "allRouteAliasesResolvable": len(missing_aliases) == 0, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 374 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 375 | (blank) | Blank spacer line used for readability. |
| 376 | (blank) | Blank spacer line used for readability. |
| 377 | @app.on_event("startup") | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 378 | def _startup_validate_kb_alias_mappings() -> None: | Defines function _startup_validate_kb_alias_mappings, which encapsulates a reusable behavior block. |
| 379 |     _log_missing_kb_alias_mappings() | Invokes a function or method to perform an operation. |
| 380 | (blank) | Blank spacer line used for readability. |
| 381 | (blank) | Blank spacer line used for readability. |
| 382 | def _synthesize_speech(answer: str, region: str, voice_id: str, engine: str, language_code: str) -> str: | Defines function _synthesize_speech, which encapsulates a reusable behavior block. |
| 383 |     import boto3 | Imports a module dependency used later in the implementation. |
| 384 | (blank) | Blank spacer line used for readability. |
| 385 |     if not answer: | Starts a conditional branch that executes only when the condition is true. |
| 386 |         return "" | Returns a value to the caller and exits the current function. |
| 387 | (blank) | Blank spacer line used for readability. |
| 388 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 389 |     client = session.client("polly", region_name=region) | Defines a module-level constant or configuration default. |
| 390 |     request: Dict[str, Any] = { | Participates in the surrounding expression, object literal, or control-flow structure. |
| 391 |         "Text": answer[:2800], | Participates in the surrounding expression, object literal, or control-flow structure. |
| 392 |         "OutputFormat": "mp3", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 393 |         "VoiceId": voice_id, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 394 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 395 |     if engine: | Starts a conditional branch that executes only when the condition is true. |
| 396 |         request["Engine"] = engine | Participates in the surrounding expression, object literal, or control-flow structure. |
| 397 |     if language_code: | Starts a conditional branch that executes only when the condition is true. |
| 398 |         request["LanguageCode"] = language_code | Participates in the surrounding expression, object literal, or control-flow structure. |
| 399 | (blank) | Blank spacer line used for readability. |
| 400 |     response = client.synthesize_speech(**request) | Defines a module-level constant or configuration default. |
| 401 |     audio_stream = response.get("AudioStream") | Defines a module-level constant or configuration default. |
| 402 |     if not audio_stream: | Starts a conditional branch that executes only when the condition is true. |
| 403 |         return "" | Returns a value to the caller and exits the current function. |
| 404 | (blank) | Blank spacer line used for readability. |
| 405 |     try: | Begins an exception-handling block for risky operations. |
| 406 |         audio_bytes = audio_stream.read() | Defines a module-level constant or configuration default. |
| 407 |     finally: | Runs cleanup logic regardless of whether an exception occurred. |
| 408 |         audio_stream.close() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 409 | (blank) | Blank spacer line used for readability. |
| 410 |     return base64.b64encode(audio_bytes).decode("utf-8") | Returns a value to the caller and exits the current function. |
| 411 | (blank) | Blank spacer line used for readability. |
| 412 | (blank) | Blank spacer line used for readability. |
| 413 | def _generate_answer_from_context(question: str, context_chunks: List[str], region: str, model_id: str, system_prompt: str) -> str: | Defines function _generate_answer_from_context, which encapsulates a reusable behavior block. |
| 414 |     from langchain_aws import ChatBedrockConverse | Imports specific symbols from another module for use in this file. |
| 415 |     from langchain_core.messages import HumanMessage, SystemMessage | Imports specific symbols from another module for use in this file. |
| 416 | (blank) | Blank spacer line used for readability. |
| 417 |     llm = ChatBedrockConverse( | Defines a module-level constant or configuration default. |
| 418 |         region_name=region, | Defines a module-level constant or configuration default. |
| 419 |         model=model_id, | Defines a module-level constant or configuration default. |
| 420 |         temperature=0.3, | Defines a module-level constant or configuration default. |
| 421 |         max_tokens=400, | Defines a module-level constant or configuration default. |
| 422 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 423 | (blank) | Blank spacer line used for readability. |
| 424 |     context_text = "\n\n".join(chunk for chunk in context_chunks if chunk.strip()) | Defines a module-level constant or configuration default. |
| 425 |     prompt = ( | Defines a module-level constant or configuration default. |
| 426 |         "You are a grounded enterprise AI assistant. " | Participates in the surrounding expression, object literal, or control-flow structure. |
| 427 |         "Use only the provided context to answer the question. " | Participates in the surrounding expression, object literal, or control-flow structure. |
| 428 |         "If the answer is not explicitly stated, provide a cautious inference from the available context and clearly label it as an inference. " | Participates in the surrounding expression, object literal, or control-flow structure. |
| 429 |         "If there is no relevant evidence in context, answer: don't know.\n\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 430 |         f"Domain guidance: {system_prompt}\n\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 431 |         "Context:\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 432 |         f"{context_text}\n\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 433 |         "Question:\n" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 434 |         f"{question}" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 435 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 436 | (blank) | Blank spacer line used for readability. |
| 437 |     response = llm.invoke([ | Defines a module-level constant or configuration default. |
| 438 |         SystemMessage(content="Grounded QA mode"), | Invokes a function or method to perform an operation. |
| 439 |         HumanMessage(content=prompt), | Invokes a function or method to perform an operation. |
| 440 |     ]) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 441 |     return str(response.content or "").strip() | Returns a value to the caller and exits the current function. |
| 442 | (blank) | Blank spacer line used for readability. |
| 443 | (blank) | Blank spacer line used for readability. |
| 444 | def _extract_kb_sources(retrieval_results: List[Dict[str, Any]]) -> List[RagSource]: | Defines function _extract_kb_sources, which encapsulates a reusable behavior block. |
| 445 |     sources: List[RagSource] = [] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 446 |     seen: Set[str] = set() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 447 | (blank) | Blank spacer line used for readability. |
| 448 |     for result in retrieval_results: | Starts a loop that iterates over a sequence of values. |
| 449 |         location = result.get("location") or {} | Defines a module-level constant or configuration default. |
| 450 |         content = result.get("content") or {} | Defines a module-level constant or configuration default. |
| 451 |         source_uri = ( | Defines a module-level constant or configuration default. |
| 452 |             (location.get("s3Location") or {}).get("uri") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 453 |             or (location.get("webLocation") or {}).get("url") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 454 |             or (location.get("confluenceLocation") or {}).get("url") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 455 |             or (location.get("salesforceLocation") or {}).get("url") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 456 |             or "" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 457 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 458 |         title = Path(source_uri).name if source_uri else "Reference" | Defines a module-level constant or configuration default. |
| 459 |         excerpt = str(content.get("text") or "")[:220] | Defines a module-level constant or configuration default. |
| 460 | (blank) | Blank spacer line used for readability. |
| 461 |         dedupe_key = f"{source_uri}\|{excerpt}" | Defines a module-level constant or configuration default. |
| 462 |         if dedupe_key in seen: | Starts a conditional branch that executes only when the condition is true. |
| 463 |             continue | Skips the rest of the current loop iteration and moves to the next item. |
| 464 |         seen.add(dedupe_key) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 465 |         sources.append( | Participates in the surrounding expression, object literal, or control-flow structure. |
| 466 |             RagSource( | Invokes a function or method to perform an operation. |
| 467 |                 title=title, | Defines a module-level constant or configuration default. |
| 468 |                 uri=source_uri, | Defines a module-level constant or configuration default. |
| 469 |                 excerpt=excerpt, | Defines a module-level constant or configuration default. |
| 470 |             ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 471 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 472 | (blank) | Blank spacer line used for readability. |
| 473 |     return sources | Returns a value to the caller and exits the current function. |
| 474 | (blank) | Blank spacer line used for readability. |
| 475 | (blank) | Blank spacer line used for readability. |
| 476 | def _query_bedrock_knowledge_base( | Defines function _query_bedrock_knowledge_base, which encapsulates a reusable behavior block. |
| 477 |     question: str, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 478 |     knowledge_base_id: str, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 479 |     region: str, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 480 |     model_id: str, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 481 |     top_k: int, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 482 |     system_prompt: str, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 483 | ) -> Dict[str, Any]: | Participates in the surrounding expression, object literal, or control-flow structure. |
| 484 |     import boto3 | Imports a module dependency used later in the implementation. |
| 485 | (blank) | Blank spacer line used for readability. |
| 486 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 487 |     client = session.client("bedrock-agent-runtime", region_name=region) | Defines a module-level constant or configuration default. |
| 488 | (blank) | Blank spacer line used for readability. |
| 489 |     response = client.retrieve( | Defines a module-level constant or configuration default. |
| 490 |         knowledgeBaseId=knowledge_base_id, | Defines a module-level constant or configuration default. |
| 491 |         retrievalQuery={"text": question}, | Defines a module-level constant or configuration default. |
| 492 |         retrievalConfiguration={ | Defines a module-level constant or configuration default. |
| 493 |             "vectorSearchConfiguration": { | Participates in the surrounding expression, object literal, or control-flow structure. |
| 494 |                 "numberOfResults": max(top_k, 1), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 495 |             } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 496 |         }, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 497 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 498 | (blank) | Blank spacer line used for readability. |
| 499 |     retrieval_results = list(response.get("retrievalResults") or []) | Defines a module-level constant or configuration default. |
| 500 |     context_chunks = [str((item.get("content") or {}).get("text") or "") for item in retrieval_results] | Defines a module-level constant or configuration default. |
| 501 |     answer = _generate_answer_from_context(question, context_chunks, region, model_id, system_prompt) | Defines a module-level constant or configuration default. |
| 502 | (blank) | Blank spacer line used for readability. |
| 503 |     return { | Returns a value to the caller and exits the current function. |
| 504 |         "answer": answer, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 505 |         "sources": _extract_kb_sources(retrieval_results), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 506 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 507 | (blank) | Blank spacer line used for readability. |
| 508 | (blank) | Blank spacer line used for readability. |
| 509 | def _build_chain(host: str, index_name: str, region: str, model_id: str, top_k: int, system_prompt: str): | Defines function _build_chain, which encapsulates a reusable behavior block. |
| 510 |     import importlib | Imports a module dependency used later in the implementation. |
| 511 |     import boto3 | Imports a module dependency used later in the implementation. |
| 512 |     from langchain_aws import BedrockEmbeddings, ChatBedrockConverse | Imports specific symbols from another module for use in this file. |
| 513 |     from langchain_community.vectorstores import OpenSearchVectorSearch | Imports specific symbols from another module for use in this file. |
| 514 |     from langchain_core.prompts import PromptTemplate | Imports specific symbols from another module for use in this file. |
| 515 |     from opensearchpy import AWSV4SignerAuth, RequestsHttpConnection | Imports specific symbols from another module for use in this file. |
| 516 | (blank) | Blank spacer line used for readability. |
| 517 |     # Resolve ConversationalRetrievalChain across LangChain module layout changes. | Comment line describing intent or behavior for the next block. |
| 518 |     chain_module = None | Defines a module-level constant or configuration default. |
| 519 |     for module_name in ("langchain_classic.chains", "langchain.chains"): | Starts a loop that iterates over a sequence of values. |
| 520 |         try: | Begins an exception-handling block for risky operations. |
| 521 |             chain_module = importlib.import_module(module_name) | Defines a module-level constant or configuration default. |
| 522 |             break | Exits the nearest active loop immediately. |
| 523 |         except ModuleNotFoundError: | Handles a specific exception type raised by the preceding try block. |
| 524 |             continue | Skips the rest of the current loop iteration and moves to the next item. |
| 525 |     if chain_module is None: | Starts a conditional branch that executes only when the condition is true. |
| 526 |         raise ModuleNotFoundError( | Raises an exception to signal an error condition to the caller. |
| 527 |             "Could not import ConversationalRetrievalChain from langchain_classic or langchain." | Participates in the surrounding expression, object literal, or control-flow structure. |
| 528 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 529 |     ConversationalRetrievalChain = chain_module.ConversationalRetrievalChain | Defines a module-level constant or configuration default. |
| 530 | (blank) | Blank spacer line used for readability. |
| 531 |     session = _aws_session() | Defines a module-level constant or configuration default. |
| 532 |     credentials = session.get_credentials() | Defines a module-level constant or configuration default. |
| 533 |     if not credentials: | Starts a conditional branch that executes only when the condition is true. |
| 534 |         raise RuntimeError( | Raises an exception to signal an error condition to the caller. |
| 535 |             "AWS credentials not found. Run 'aws sso login' and set AWS_PROFILE if needed." | Participates in the surrounding expression, object literal, or control-flow structure. |
| 536 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 537 | (blank) | Blank spacer line used for readability. |
| 538 |     llm = ChatBedrockConverse( | Defines a module-level constant or configuration default. |
| 539 |         region_name=region, | Defines a module-level constant or configuration default. |
| 540 |         model=model_id, | Defines a module-level constant or configuration default. |
| 541 |         temperature=0.3, | Defines a module-level constant or configuration default. |
| 542 |         max_tokens=400, | Defines a module-level constant or configuration default. |
| 543 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 544 | (blank) | Blank spacer line used for readability. |
| 545 |     embeddings = BedrockEmbeddings(region_name=region, model_id=BEDROCK_EMBEDDING_MODEL_ID) | Defines a module-level constant or configuration default. |
| 546 | (blank) | Blank spacer line used for readability. |
| 547 |     vector_store = OpenSearchVectorSearch( | Defines a module-level constant or configuration default. |
| 548 |         f"https://{host}", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 549 |         index_name, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 550 |         embeddings, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 551 |         http_auth=AWSV4SignerAuth(credentials, region, AOSS_SVC_NAME), | Defines a module-level constant or configuration default. |
| 552 |         timeout=DEFAULT_TIMEOUT_AOSS, | Defines a module-level constant or configuration default. |
| 553 |         use_ssl=True, | Defines a module-level constant or configuration default. |
| 554 |         verify_certs=True, | Defines a module-level constant or configuration default. |
| 555 |         connection_class=RequestsHttpConnection, | Defines a module-level constant or configuration default. |
| 556 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 557 |     retriever = vector_store.as_retriever(search_kwargs={"k": max(top_k, 1)}) | Defines a module-level constant or configuration default. |
| 558 | (blank) | Blank spacer line used for readability. |
| 559 |     qa_prompt = PromptTemplate( | Defines a module-level constant or configuration default. |
| 560 |         template=f"""Human: This is a friendly conversation between a human and an AI. | Defines a module-level constant or configuration default. |
| 561 | The AI is talkative and provides specific details from its context but limits it to 240 tokens. | Participates in the surrounding expression, object literal, or control-flow structure. |
| 562 | If the AI does not know the answer to a question, it truthfully says it does not know. | Starts a conditional branch that executes only when the condition is true. |
| 563 | (blank) | Blank spacer line used for readability. |
| 564 | Assistant: OK, got it, I'll be a talkative truthful AI assistant. | Participates in the surrounding expression, object literal, or control-flow structure. |
| 565 | (blank) | Blank spacer line used for readability. |
| 566 | Human: Here are a few documents in <documents> tags: | Participates in the surrounding expression, object literal, or control-flow structure. |
| 567 | <documents> | Participates in the surrounding expression, object literal, or control-flow structure. |
| 568 | {{context}} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 569 | </documents> | Participates in the surrounding expression, object literal, or control-flow structure. |
| 570 | Based on the above documents, provide a detailed answer for, {{question}} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 571 | If the answer is not explicitly present, provide a cautious inference grounded in the documents and label it as an inference. | Starts a conditional branch that executes only when the condition is true. |
| 572 | Answer \"don't know\" only when the documents contain no relevant evidence. | Participates in the surrounding expression, object literal, or control-flow structure. |
| 573 | (blank) | Blank spacer line used for readability. |
| 574 | Domain guidance: {system_prompt} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 575 | (blank) | Blank spacer line used for readability. |
| 576 | Assistant: | Participates in the surrounding expression, object literal, or control-flow structure. |
| 577 | """, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 578 |         input_variables=["context", "question"], | Defines a module-level constant or configuration default. |
| 579 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 580 | (blank) | Blank spacer line used for readability. |
| 581 |     condense_prompt = PromptTemplate.from_template( | Defines a module-level constant or configuration default. |
| 582 |         """{chat_history} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 583 | Human: Rephrase the follow-up into a standalone question. | Participates in the surrounding expression, object literal, or control-flow structure. |
| 584 | Follow Up Question: {question} | Participates in the surrounding expression, object literal, or control-flow structure. |
| 585 | Standalone Question: | Participates in the surrounding expression, object literal, or control-flow structure. |
| 586 | Assistant:""" | Participates in the surrounding expression, object literal, or control-flow structure. |
| 587 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 588 | (blank) | Blank spacer line used for readability. |
| 589 |     return ConversationalRetrievalChain.from_llm( | Returns a value to the caller and exits the current function. |
| 590 |         llm=llm, | Defines a module-level constant or configuration default. |
| 591 |         retriever=retriever, | Defines a module-level constant or configuration default. |
| 592 |         condense_question_prompt=condense_prompt, | Defines a module-level constant or configuration default. |
| 593 |         return_source_documents=True, | Defines a module-level constant or configuration default. |
| 594 |         combine_docs_chain_kwargs={"prompt": qa_prompt}, | Defines a module-level constant or configuration default. |
| 595 |         verbose=False, | Defines a module-level constant or configuration default. |
| 596 |     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 597 | (blank) | Blank spacer line used for readability. |
| 598 | (blank) | Blank spacer line used for readability. |
| 599 | def _extract_sources(source_documents: List[Any]) -> List[RagSource]: | Defines function _extract_sources, which encapsulates a reusable behavior block. |
| 600 |     sources: List[RagSource] = [] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 601 |     seen: Set[str] = set() | Participates in the surrounding expression, object literal, or control-flow structure. |
| 602 | (blank) | Blank spacer line used for readability. |
| 603 |     for doc in source_documents: | Starts a loop that iterates over a sequence of values. |
| 604 |         source_uri = str(doc.metadata.get("source", "")) | Defines a module-level constant or configuration default. |
| 605 |         if source_uri in seen: | Starts a conditional branch that executes only when the condition is true. |
| 606 |             continue | Skips the rest of the current loop iteration and moves to the next item. |
| 607 |         seen.add(source_uri) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 608 |         sources.append( | Participates in the surrounding expression, object literal, or control-flow structure. |
| 609 |             RagSource( | Invokes a function or method to perform an operation. |
| 610 |                 title=source_uri.split("/")[-1] if source_uri else "Reference", | Defines a module-level constant or configuration default. |
| 611 |                 uri=source_uri, | Defines a module-level constant or configuration default. |
| 612 |                 excerpt=str(doc.page_content or "")[:220], | Defines a module-level constant or configuration default. |
| 613 |             ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 614 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 615 | (blank) | Blank spacer line used for readability. |
| 616 |     return sources | Returns a value to the caller and exits the current function. |
| 617 | (blank) | Blank spacer line used for readability. |
| 618 | (blank) | Blank spacer line used for readability. |
| 619 | @app.get("/health") | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 620 | def health() -> Dict[str, str]: | Defines function health, which encapsulates a reusable behavior block. |
| 621 |     return {"status": "ok"} | Returns a value to the caller and exits the current function. |
| 622 | (blank) | Blank spacer line used for readability. |
| 623 | (blank) | Blank spacer line used for readability. |
| 624 | @app.get("/health/config") | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 625 | def health_config() -> Dict[str, Any]: | Defines function health_config, which encapsulates a reusable behavior block. |
| 626 |     missing = _missing_required_rag_env_vars() | Defines a module-level constant or configuration default. |
| 627 |     return { | Returns a value to the caller and exits the current function. |
| 628 |         "status": "ok" if not missing else "degraded", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 629 |         "requiredEnvVars": REQUIRED_RAG_ENV_VARS, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 630 |         "missingRequiredEnvVars": missing, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 631 |         "ready": len(missing) == 0, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 632 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 633 | (blank) | Blank spacer line used for readability. |
| 634 | (blank) | Blank spacer line used for readability. |
| 635 | @app.get("/health/kb") | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 636 | def health_kb(knowledgeBaseId: Optional[str] = None) -> Dict[str, Any]: | Defines function health_kb, which encapsulates a reusable behavior block. |
| 637 |     requested = (knowledgeBaseId or "").strip() | Defines a module-level constant or configuration default. |
| 638 |     fallback_kb_id = (os.environ.get("BEDROCK_KNOWLEDGE_BASE_ID") or "").strip() | Defines a module-level constant or configuration default. |
| 639 |     resolved = _resolve_knowledge_base_id(requested) if requested else "" | Defines a module-level constant or configuration default. |
| 640 |     alias_health = _kb_alias_mapping_health() | Defines a module-level constant or configuration default. |
| 641 | (blank) | Blank spacer line used for readability. |
| 642 |     return { | Returns a value to the caller and exits the current function. |
| 643 |         "status": "ok" if alias_health["allRouteAliasesResolvable"] else "degraded", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 644 |         "requestedKnowledgeBaseId": requested, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 645 |         "resolvedKnowledgeBaseId": resolved, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 646 |         "usedFallbackKnowledgeBaseId": bool(requested and fallback_kb_id and resolved == fallback_kb_id and requested != fallback_kb_id), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 647 |         "defaultKnowledgeBaseIdConfigured": bool(fallback_kb_id), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 648 |         "configuredAliasMappings": _configured_kb_alias_mappings(), | Participates in the surrounding expression, object literal, or control-flow structure. |
| 649 |         "aliasMappingHealth": alias_health, | Participates in the surrounding expression, object literal, or control-flow structure. |
| 650 |         "hint": "Provide ?knowledgeBaseId=kb-data-sciences (or AWS KB ID) to validate runtime resolution.", | Participates in the surrounding expression, object literal, or control-flow structure. |
| 651 |     } | Participates in the surrounding expression, object literal, or control-flow structure. |
| 652 | (blank) | Blank spacer line used for readability. |
| 653 | (blank) | Blank spacer line used for readability. |
| 654 | @app.post("/api/contact/submit", response_model=ContactSubmissionResponse) | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 655 | def submit_contact(request: ContactSubmissionRequest) -> ContactSubmissionResponse: | Defines function submit_contact, which encapsulates a reusable behavior block. |
| 656 |     try: | Begins an exception-handling block for risky operations. |
| 657 |         if not _contact_env_value("CONTACT_DDB_TABLE"): | Starts a conditional branch that executes only when the condition is true. |
| 658 |             raise RuntimeError("Missing contact environment variable: CONTACT_DDB_TABLE") | Raises an exception to signal an error condition to the caller. |
| 659 | (blank) | Blank spacer line used for readability. |
| 660 |         submission_id = str(uuid4()) | Defines a module-level constant or configuration default. |
| 661 |         created_at = datetime.now(timezone.utc).isoformat() | Defines a module-level constant or configuration default. |
| 662 | (blank) | Blank spacer line used for readability. |
| 663 |         _store_contact_submission(submission_id, created_at, request) | Invokes a function or method to perform an operation. |
| 664 |         email_sent = False | Defines a module-level constant or configuration default. |
| 665 |         sms_sent = False | Defines a module-level constant or configuration default. |
| 666 |         errors: List[str] = [] | Participates in the surrounding expression, object literal, or control-flow structure. |
| 667 | (blank) | Blank spacer line used for readability. |
| 668 |         try: | Begins an exception-handling block for risky operations. |
| 669 |             email_sent = _send_contact_email(submission_id, created_at, request) | Defines a module-level constant or configuration default. |
| 670 |         except Exception as exc: | Handles a specific exception type raised by the preceding try block. |
| 671 |             LOGGER.exception("Contact email notification failed") | Writes diagnostic information to application logs. |
| 672 |             errors.append(f"email: {str(exc).strip() or 'failed to send'}") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 673 | (blank) | Blank spacer line used for readability. |
| 674 |         try: | Begins an exception-handling block for risky operations. |
| 675 |             sms_sent = _send_contact_sms(submission_id, request) | Defines a module-level constant or configuration default. |
| 676 |         except Exception as exc: | Handles a specific exception type raised by the preceding try block. |
| 677 |             LOGGER.exception("Contact SMS notification failed") | Writes diagnostic information to application logs. |
| 678 |             errors.append(f"sms: {str(exc).strip() or 'failed to send'}") | Participates in the surrounding expression, object literal, or control-flow structure. |
| 679 | (blank) | Blank spacer line used for readability. |
| 680 |         status = "processed" if not errors else "processed_with_warnings" | Defines a module-level constant or configuration default. |
| 681 | (blank) | Blank spacer line used for readability. |
| 682 |         return ContactSubmissionResponse( | Returns a value to the caller and exits the current function. |
| 683 |             status=status, | Defines a module-level constant or configuration default. |
| 684 |             submissionId=submission_id, | Defines a module-level constant or configuration default. |
| 685 |             emailSent=email_sent, | Defines a module-level constant or configuration default. |
| 686 |             smsSent=sms_sent, | Defines a module-level constant or configuration default. |
| 687 |             errors=errors, | Defines a module-level constant or configuration default. |
| 688 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 689 |     except RuntimeError as exc: | Handles a specific exception type raised by the preceding try block. |
| 690 |         raise HTTPException(status_code=500, detail=str(exc)) from exc | Raises an exception to signal an error condition to the caller. |
| 691 |     except Exception as exc: | Handles a specific exception type raised by the preceding try block. |
| 692 |         LOGGER.exception("Unhandled error in submit_contact") | Writes diagnostic information to application logs. |
| 693 |         detail = str(exc).strip() or "Internal server error" | Defines a module-level constant or configuration default. |
| 694 |         raise HTTPException(status_code=500, detail=detail) from exc | Raises an exception to signal an error condition to the caller. |
| 695 | (blank) | Blank spacer line used for readability. |
| 696 | (blank) | Blank spacer line used for readability. |
| 697 | @app.post("/api/speech/synthesize", response_model=SpeechSynthesisResponse) | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 698 | def synthesize_speech(request: SpeechSynthesisRequest) -> SpeechSynthesisResponse: | Defines function synthesize_speech, which encapsulates a reusable behavior block. |
| 699 |     try: | Begins an exception-handling block for risky operations. |
| 700 |         text = request.text.strip() | Defines a module-level constant or configuration default. |
| 701 |         if not text: | Starts a conditional branch that executes only when the condition is true. |
| 702 |             raise HTTPException(status_code=400, detail="text is required") | Raises an exception to signal an error condition to the caller. |
| 703 | (blank) | Blank spacer line used for readability. |
| 704 |         region = _resolve_aws_region() | Defines a module-level constant or configuration default. |
| 705 |         voice_id = (request.voiceId or DEFAULT_POLLY_VOICE_ID).strip() or DEFAULT_POLLY_VOICE_ID | Defines a module-level constant or configuration default. |
| 706 |         engine = (request.engine or DEFAULT_POLLY_ENGINE).strip() or DEFAULT_POLLY_ENGINE | Defines a module-level constant or configuration default. |
| 707 |         language_code = (request.languageCode or DEFAULT_POLLY_LANGUAGE_CODE).strip() or DEFAULT_POLLY_LANGUAGE_CODE | Defines a module-level constant or configuration default. |
| 708 | (blank) | Blank spacer line used for readability. |
| 709 |         audio_base64 = _synthesize_speech(text, region, voice_id, engine, language_code) | Defines a module-level constant or configuration default. |
| 710 |         if not audio_base64: | Starts a conditional branch that executes only when the condition is true. |
| 711 |             raise HTTPException(status_code=502, detail="Polly returned no audio stream") | Raises an exception to signal an error condition to the caller. |
| 712 | (blank) | Blank spacer line used for readability. |
| 713 |         return SpeechSynthesisResponse( | Returns a value to the caller and exits the current function. |
| 714 |             voiceId=voice_id, | Defines a module-level constant or configuration default. |
| 715 |             engine=engine, | Defines a module-level constant or configuration default. |
| 716 |             languageCode=language_code, | Defines a module-level constant or configuration default. |
| 717 |             audioBase64=audio_base64, | Defines a module-level constant or configuration default. |
| 718 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 719 |     except HTTPException: | Handles a specific exception type raised by the preceding try block. |
| 720 |         raise | Participates in the surrounding expression, object literal, or control-flow structure. |
| 721 |     except Exception as exc: | Handles a specific exception type raised by the preceding try block. |
| 722 |         LOGGER.exception("Unhandled error in synthesize_speech") | Writes diagnostic information to application logs. |
| 723 |         detail = str(exc).strip() or "Unable to synthesize speech" | Defines a module-level constant or configuration default. |
| 724 |         raise HTTPException(status_code=500, detail=detail) from exc | Raises an exception to signal an error condition to the caller. |
| 725 | (blank) | Blank spacer line used for readability. |
| 726 | (blank) | Blank spacer line used for readability. |
| 727 | @app.post("/api/bedrock/rag/query", response_model=RagResponse) | FastAPI decorator that registers the following function as an API route or lifecycle hook. |
| 728 | def rag_query(request: RagRequest) -> RagResponse: | Defines function rag_query, which encapsulates a reusable behavior block. |
| 729 |     try: | Begins an exception-handling block for risky operations. |
| 730 |         question = request.question.strip() | Defines a module-level constant or configuration default. |
| 731 |         if not question: | Starts a conditional branch that executes only when the condition is true. |
| 732 |             raise HTTPException(status_code=400, detail="question is required") | Raises an exception to signal an error condition to the caller. |
| 733 | (blank) | Blank spacer line used for readability. |
| 734 |         config = request.config | Defines a module-level constant or configuration default. |
| 735 |         model_id = (config.modelId or DEFAULT_MODEL_ID).strip() | Defines a module-level constant or configuration default. |
| 736 |         top_k = config.topK if config.topK is not None else DEFAULT_K | Defines a module-level constant or configuration default. |
| 737 |         system_prompt = (config.systemPrompt or "Provide clear, grounded recommendations.").strip() | Defines a module-level constant or configuration default. |
| 738 |         knowledge_base_id = _resolve_knowledge_base_id(config.knowledgeBaseId or "") | Defines a module-level constant or configuration default. |
| 739 |         speech_enabled = config.speechEnabled if config.speechEnabled is not None else True | Defines a module-level constant or configuration default. |
| 740 |         voice_id = (config.voiceId or DEFAULT_POLLY_VOICE_ID).strip() | Defines a module-level constant or configuration default. |
| 741 |         engine = (config.engine or DEFAULT_POLLY_ENGINE).strip() | Defines a module-level constant or configuration default. |
| 742 |         language_code = (config.languageCode or DEFAULT_POLLY_LANGUAGE_CODE).strip() | Defines a module-level constant or configuration default. |
| 743 | (blank) | Blank spacer line used for readability. |
| 744 |         aoss_id = _required_env("AOSS_ID") | Defines a module-level constant or configuration default. |
| 745 |         aoss_region = _required_env("AOSS_AWS_REGION") | Defines a module-level constant or configuration default. |
| 746 |         index_name = _required_env("AOSS_INDEX_NAME") | Defines a module-level constant or configuration default. |
| 747 |         host = f"{aoss_id}.{aoss_region}.{AOSS_SVC_NAME}.amazonaws.com:443" | Defines a module-level constant or configuration default. |
| 748 | (blank) | Blank spacer line used for readability. |
| 749 |         def _run_rag_once(query_text: str, effective_top_k: int) -> Tuple[str, List[RagSource]]: | Defines function _run_rag_once, which encapsulates a reusable behavior block. |
| 750 |             if knowledge_base_id: | Starts a conditional branch that executes only when the condition is true. |
| 751 |                 try: | Begins an exception-handling block for risky operations. |
| 752 |                     kb_result = _query_bedrock_knowledge_base( | Defines a module-level constant or configuration default. |
| 753 |                         question=query_text, | Defines a module-level constant or configuration default. |
| 754 |                         knowledge_base_id=knowledge_base_id, | Defines a module-level constant or configuration default. |
| 755 |                         region=aoss_region, | Defines a module-level constant or configuration default. |
| 756 |                         model_id=model_id, | Defines a module-level constant or configuration default. |
| 757 |                         top_k=effective_top_k, | Defines a module-level constant or configuration default. |
| 758 |                         system_prompt=system_prompt, | Defines a module-level constant or configuration default. |
| 759 |                     ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 760 |                     resolved_answer = str(kb_result.get("answer", "")) | Defines a module-level constant or configuration default. |
| 761 |                     resolved_sources = list(kb_result.get("sources", [])) | Defines a module-level constant or configuration default. |
| 762 |                     return resolved_answer, resolved_sources | Returns a value to the caller and exits the current function. |
| 763 |                 except Exception: | Handles a specific exception type raised by the preceding try block. |
| 764 |                     LOGGER.exception("Knowledge base retrieval failed for %s; falling back to OpenSearch", knowledge_base_id) | Writes diagnostic information to application logs. |
| 765 | (blank) | Blank spacer line used for readability. |
| 766 |             chain = _build_chain(host, index_name, aoss_region, model_id, effective_top_k, system_prompt) | Defines a module-level constant or configuration default. |
| 767 |             try: | Begins an exception-handling block for risky operations. |
| 768 |                 result = chain({"question": query_text, "chat_history": []}) | Defines a module-level constant or configuration default. |
| 769 |             except Exception as model_exc: | Handles a specific exception type raised by the preceding try block. |
| 770 |                 # If caller supplied an invalid model id, retry with backend default model. | Comment line describing intent or behavior for the next block. |
| 771 |                 invalid_model = "provided model identifier is invalid" in str(model_exc).lower() | Defines a module-level constant or configuration default. |
| 772 |                 fallback_model = DEFAULT_MODEL_ID.strip() | Defines a module-level constant or configuration default. |
| 773 |                 if invalid_model and fallback_model and fallback_model != model_id: | Starts a conditional branch that executes only when the condition is true. |
| 774 |                     LOGGER.warning("Model '%s' is invalid; retrying with fallback '%s'", model_id, fallback_model) | Writes diagnostic information to application logs. |
| 775 |                     fallback_chain = _build_chain(host, index_name, aoss_region, fallback_model, effective_top_k, system_prompt) | Defines a module-level constant or configuration default. |
| 776 |                     result = fallback_chain({"question": query_text, "chat_history": []}) | Defines a module-level constant or configuration default. |
| 777 |                 else: | Begins the fallback branch executed when previous conditions are not met. |
| 778 |                     raise | Participates in the surrounding expression, object literal, or control-flow structure. |
| 779 | (blank) | Blank spacer line used for readability. |
| 780 |             resolved_answer = str(result.get("answer", "")) | Defines a module-level constant or configuration default. |
| 781 |             source_documents = list(result.get("source_documents", [])) | Defines a module-level constant or configuration default. |
| 782 |             resolved_sources = _extract_sources(source_documents) | Defines a module-level constant or configuration default. |
| 783 |             return resolved_answer, resolved_sources | Returns a value to the caller and exits the current function. |
| 784 | (blank) | Blank spacer line used for readability. |
| 785 |         answer, sources = _run_rag_once(question, top_k) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 786 | (blank) | Blank spacer line used for readability. |
| 787 |         speech = RagSpeech( | Defines a module-level constant or configuration default. |
| 788 |             enabled=speech_enabled, | Defines a module-level constant or configuration default. |
| 789 |             voiceId=voice_id, | Defines a module-level constant or configuration default. |
| 790 |             engine=engine, | Defines a module-level constant or configuration default. |
| 791 |             languageCode=language_code, | Defines a module-level constant or configuration default. |
| 792 |         ) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 793 |         if speech_enabled: | Starts a conditional branch that executes only when the condition is true. |
| 794 |             try: | Begins an exception-handling block for risky operations. |
| 795 |                 speech.audioBase64 = _synthesize_speech(answer, aoss_region, voice_id, engine, language_code) | Participates in the surrounding expression, object literal, or control-flow structure. |
| 796 |             except Exception: | Handles a specific exception type raised by the preceding try block. |
| 797 |                 LOGGER.exception("Polly synthesis failed") | Writes diagnostic information to application logs. |
| 798 | (blank) | Blank spacer line used for readability. |
| 799 |         return RagResponse(answer=answer, sources=sources, speech=speech) | Returns a value to the caller and exits the current function. |
| 800 |     except HTTPException: | Handles a specific exception type raised by the preceding try block. |
| 801 |         raise | Participates in the surrounding expression, object literal, or control-flow structure. |
| 802 |     except RuntimeError as exc: | Handles a specific exception type raised by the preceding try block. |
| 803 |         if _is_expired_aws_token_error(exc): | Starts a conditional branch that executes only when the condition is true. |
| 804 |             raise HTTPException( | Raises an exception to signal an error condition to the caller. |
| 805 |                 status_code=401, | Defines a module-level constant or configuration default. |
| 806 |                 detail="AWS session expired. Run 'aws login' and restart the backend with 'npm run start:backend:aws'.", | Defines a module-level constant or configuration default. |
| 807 |             ) from exc | Participates in the surrounding expression, object literal, or control-flow structure. |
| 808 | (blank) | Blank spacer line used for readability. |
| 809 |         raise HTTPException(status_code=500, detail=str(exc)) from exc | Raises an exception to signal an error condition to the caller. |
| 810 |     except Exception as exc: | Handles a specific exception type raised by the preceding try block. |
| 811 |         if _is_expired_aws_token_error(exc): | Starts a conditional branch that executes only when the condition is true. |
| 812 |             raise HTTPException( | Raises an exception to signal an error condition to the caller. |
| 813 |                 status_code=401, | Defines a module-level constant or configuration default. |
| 814 |                 detail="AWS session expired. Run 'aws login' and restart the backend with 'npm run start:backend:aws'.", | Defines a module-level constant or configuration default. |
| 815 |             ) from exc | Participates in the surrounding expression, object literal, or control-flow structure. |
| 816 | (blank) | Blank spacer line used for readability. |
| 817 |         LOGGER.exception("Unhandled error in rag_query") | Writes diagnostic information to application logs. |
| 818 |         detail = str(exc).strip() or "Internal server error" | Defines a module-level constant or configuration default. |
| 819 |         raise HTTPException(status_code=500, detail=detail) from exc | Raises an exception to signal an error condition to the caller. |

## Practical Examples

1. Environment fallback behavior
	- Relevant lines: 174-184, 187-191
	- If CONTACT_EMAIL_TO is not in process environment, the code reads backend/.env.
	- Example: process env has no CONTACT_EMAIL_TO but backend/.env contains CONTACT_EMAIL_TO=team@example.com, so _required_contact_env("CONTACT_EMAIL_TO") returns team@example.com.

2. AWS region resolution order
	- Relevant lines: 198-209
	- The first non-empty value wins in this order: AWS_REGION, AWS_DEFAULT_REGION, AOSS_AWS_REGION.
	- Example: AWS_REGION="", AWS_DEFAULT_REGION="us-west-2", AOSS_AWS_REGION="us-east-1" results in us-west-2.

3. Knowledge base alias mapping
	- Relevant lines: 294-312
	- Aliases like kb-machine-learning map to env key KB_MACHINE_LEARNING_ID.
	- Example: if KB_MACHINE_LEARNING_ID=ABCD1234EF and request uses knowledgeBaseId="kb-machine-learning", the resolved ID becomes ABCD1234EF.

4. RAG retrieval fallback path
	- Relevant lines: 749-783
	- The endpoint tries Bedrock KB retrieval first when a KB ID is available; if that fails it falls back to OpenSearch + LangChain retrieval.
	- Example: temporary Bedrock KB error logs "falling back to OpenSearch" and still returns an answer from vector retrieval.

5. Invalid model retry behavior
	- Relevant lines: 769-776
	- If a request model ID is invalid, the code retries once with DEFAULT_MODEL_ID.
	- Example: request modelId="bad.model.id" can recover by retrying with amazon.nova-micro-v1:0.

6. Expired AWS token handling
	- Relevant lines: 126-143, 803-815
	- Expired token patterns are detected and converted to HTTP 401 with remediation guidance.
	- Example: if AWS SSO token expires, response is 401 with detail instructing to run aws login and restart backend.

7. Contact notification partial-success behavior
	- Relevant lines: 668-688
	- Contact record is stored first; email/SMS failures are captured as warnings instead of failing the whole request.
	- Example: DynamoDB write succeeds, SES fails, SNS succeeds results in status=processed_with_warnings and email error listed.
