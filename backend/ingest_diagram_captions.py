import argparse
import os
from typing import List, Optional, Tuple

import boto3
import fitz  # type: ignore[import-not-found]
from dotenv import load_dotenv

DEFAULT_MODEL_ID = os.environ.get("DIAGRAM_CAPTION_MODEL_ID", "anthropic.claude-3-5-sonnet-v2:0")
DEFAULT_MAX_PAGES = 30
VECTOR_ONLY_HINTS = (
    "vector drawing",
    "vector graphic",
    "vector illustration",
)


def _parse_s3_uri(uri: str) -> Tuple[str, str]:
    if not uri.startswith("s3://"):
        raise ValueError("S3 URI must start with s3://")
    remainder = uri[5:]
    if "/" not in remainder:
        raise ValueError("S3 URI must include object key")
    bucket, key = remainder.split("/", 1)
    return bucket, key


def _load_pdf_bytes(local_path: Optional[str], s3_uri: Optional[str], s3_client) -> Tuple[bytes, str]:
    if local_path:
        with open(local_path, "rb") as f:
            return f.read(), os.path.basename(local_path)

    if s3_uri:
        bucket, key = _parse_s3_uri(s3_uri)
        obj = s3_client.get_object(Bucket=bucket, Key=key)
        return obj["Body"].read(), os.path.basename(key)

    raise ValueError("Provide either --pdf-path or --pdf-s3-uri")


def _render_page_png_bytes(pdf_bytes: bytes, page_number: int, dpi: int = 180) -> bytes:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    try:
        if page_number < 1 or page_number > len(doc):
            raise ValueError(f"Page {page_number} is out of range (1-{len(doc)})")
        page = doc[page_number - 1]
        zoom = dpi / 72
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        return pix.tobytes("png")
    finally:
        doc.close()


def _extract_text_from_converse_response(response: dict) -> str:
    output = response.get("output", {})
    message = output.get("message", {})
    content = message.get("content", [])

    text_parts: List[str] = []
    for part in content:
        if text := part.get("text"):
            text_parts.append(text.strip())

    return "\n".join([part for part in text_parts if part])


def _caption_page_with_claude(bedrock_client, model_id: str, image_png_bytes: bytes, page_number: int) -> str:
    prompt = (
        "You are extracting searchable text from a PDF page image for RAG indexing. "
        "Focus on diagrams, charts, tables, flowcharts, axes labels, legend values, and callouts. "
        "Return concise bullet points with exact terms and numbers visible in the diagram. "
        "If the page has no diagram/chart/table content, return exactly: NO_DIAGRAM_CONTENT."
    )

    response = bedrock_client.converse(
        modelId=model_id,
        messages=[
            {
                "role": "user",
                "content": [
                    {"text": f"Page {page_number}. {prompt}"},
                    {
                        "image": {
                            "format": "png",
                            "source": {"bytes": image_png_bytes},
                        }
                    },
                ],
            }
        ],
        inferenceConfig={"temperature": 0.0, "maxTokens": 800},
    )

    return _extract_text_from_converse_response(response).strip()


def _is_vector_only_caption(caption: str) -> bool:
    normalized = (caption or "").strip().lower()
    if not normalized:
        return False
    return any(hint in normalized for hint in VECTOR_ONLY_HINTS)


def _iter_page_numbers(total_pages: int, max_pages: int, only_pages: Optional[List[int]]) -> List[int]:
    if only_pages:
        return [p for p in only_pages if 1 <= p <= total_pages]
    return list(range(1, min(total_pages, max_pages) + 1))


def _normalize_s3_prefix(uri: str) -> Tuple[str, str]:
    bucket, key = _parse_s3_uri(uri.rstrip("/") + "/placeholder.txt")
    return bucket, key.rsplit("/", 1)[0]


def main() -> None:
    load_dotenv("backend/.env", override=False)
    load_dotenv(".env", override=False)

    parser = argparse.ArgumentParser(description="Extract diagram captions from PDF pages using Bedrock Claude")
    parser.add_argument("--pdf-path", help="Local PDF path")
    parser.add_argument("--pdf-s3-uri", help="Source PDF S3 URI, e.g. s3://bucket/path/file.pdf")
    parser.add_argument("--output-s3-uri", required=True, help="Output text S3 URI prefix, e.g. s3://bucket/processed/")
    parser.add_argument(
        "--image-s3-uri-prefix",
        help="Optional S3 URI prefix where rendered diagram images are stored, e.g. s3://bucket/processed/diagram-images/",
    )
    parser.add_argument("--region", default=os.environ.get("AWS_REGION") or os.environ.get("AOSS_AWS_REGION") or "us-east-1")
    parser.add_argument("--model-id", default=DEFAULT_MODEL_ID)
    parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES)
    parser.add_argument("--pages", help="Comma-separated 1-based page numbers, e.g. 1,2,5")

    args = parser.parse_args()

    if not args.pdf_path and not args.pdf_s3_uri:
        raise SystemExit("Provide --pdf-path or --pdf-s3-uri")

    session = boto3.Session()
    s3_client = session.client("s3", region_name=args.region)
    bedrock_client = session.client("bedrock-runtime", region_name=args.region)

    pdf_bytes, source_name = _load_pdf_bytes(args.pdf_path, args.pdf_s3_uri, s3_client)

    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        total_pages = len(doc)

    only_pages = None
    if args.pages:
        only_pages = [int(x.strip()) for x in args.pages.split(",") if x.strip()]

    page_numbers = _iter_page_numbers(total_pages=total_pages, max_pages=args.max_pages, only_pages=only_pages)

    print(f"Scanning {len(page_numbers)} page(s) from {source_name} with model {args.model_id}")

    out_bucket, out_key_prefix = _normalize_s3_prefix(args.output_s3_uri)
    image_prefix = args.image_s3_uri_prefix or f"s3://{out_bucket}/{out_key_prefix}/diagram-images/{os.path.splitext(source_name)[0]}/"
    image_bucket, image_key_prefix = _normalize_s3_prefix(image_prefix)

    extracted_blocks: List[str] = []
    for page_number in page_numbers:
        png_bytes = _render_page_png_bytes(pdf_bytes=pdf_bytes, page_number=page_number)
        caption = _caption_page_with_claude(
            bedrock_client=bedrock_client,
            model_id=args.model_id,
            image_png_bytes=png_bytes,
            page_number=page_number,
        )

        if caption == "NO_DIAGRAM_CONTENT" or not caption:
            continue

        if _is_vector_only_caption(caption):
            print(f"Skipping vector-only content on page {page_number}")
            continue

        image_key = f"{image_key_prefix}/page-{page_number:03d}.png"
        s3_client.put_object(
            Bucket=image_bucket,
            Key=image_key,
            Body=png_bytes,
            ContentType="image/png",
        )
        image_s3_uri = f"s3://{image_bucket}/{image_key}"

        extracted_blocks.append(f"## Page {page_number}\nImage: {image_s3_uri}\n{caption}")
        print(f"Captured diagram content on page {page_number}")

    if not extracted_blocks:
        print("No diagram content found to index.")
        return

    output_text = (
        f"# Diagram Captions for {source_name}\n"
        f"Source: {args.pdf_s3_uri or args.pdf_path}\n\n"
        + "\n\n".join(extracted_blocks)
    )

    out_key = f"{out_key_prefix}/{os.path.splitext(source_name)[0]}-diagram-captions.txt"

    s3_client.put_object(
        Bucket=out_bucket,
        Key=out_key,
        Body=output_text.encode("utf-8"),
        ContentType="text/plain; charset=utf-8",
    )

    print(f"Uploaded diagram captions to s3://{out_bucket}/{out_key}")


if __name__ == "__main__":
    main()
