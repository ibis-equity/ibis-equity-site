# IbisEquitySite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4202/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## AWS Bedrock RAG integration

This frontend can call a Bedrock/OpenSearch RAG backend based on the companion `rag-with-amazon-bedrock-and-opensearch` implementation.

### Option 1: Run a local backend component in this repo (recommended for dev)

The `backend/` folder contains a FastAPI service that ports the `lambda/rag-query` behavior from the companion project and exposes:

- `POST /api/bedrock/rag/query`
- `GET /health`
- `GET /health/config` (shows missing required environment variables)

1. Create and activate a Python environment.
2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Create `backend/.env` from `backend/.env.example` and fill required values:

```bash
copy backend\\.env.example backend\\.env
```

Required values in `backend/.env`:

```bash
AOSS_ID=<your-opensearch-serverless-collection-id>
AOSS_AWS_REGION=<aws-region>
AOSS_INDEX_NAME=<your-index-name>
BEDROCK_CHAT_MODEL_ID=anthropic.claude-3-5-sonnet-v2:0
```

### Enable Diagram Retrieval (Claude + PDF Diagrams)

Uploading a PDF alone does not make diagrams retrievable. The retrieval index needs text that describes diagrams.

Use the included utility to extract diagram/chart/table captions from PDF pages with Bedrock Claude and write the result as a `.txt` object to S3, so your existing ingestion/indexing flow can pick it up.

1. Install backend dependencies (includes `PyMuPDF`):

```bash
pip install -r backend/requirements.txt
```

2. Run diagram caption extraction against a local PDF:

```bash
python backend/ingest_diagram_captions.py \
	--pdf-path C:\\path\\to\\document.pdf \
	--output-s3-uri s3://<processed-text-bucket>/<prefix>/ \
	--region us-east-1 \
	--model-id anthropic.claude-3-5-sonnet-v2:0
```

Or use a PDF already in S3:

```bash
python backend/ingest_diagram_captions.py \
	--pdf-s3-uri s3://<source-bucket>/<path>/document.pdf \
	--output-s3-uri s3://<processed-text-bucket>/<prefix>/ \
	--region us-east-1
```

3. Re-run your ingestion/indexing step if your pipeline is not auto-triggered.

4. Query the chatbot again. Sources should include a `*-diagram-captions.txt` object when diagram content is retrieved.

4. Run the backend:

```bash
uvicorn backend.app:app --host 0.0.0.0 --port 8010 --reload
```

5. Start Angular:

```bash
npm start
```

`npm start` uses `proxy.conf.json`, so frontend requests to `/api/bedrock/rag/query` are forwarded to `http://localhost:8010`.

### One-command local startup

After backend dependencies are installed, you can start both services from this repo root:

```bash
npm run start:full
```

This runs:

- `npm run start:frontend` (Angular on `http://localhost:4202`)
- `npm run start:backend` (FastAPI on `http://localhost:8010`)

The backend automatically loads environment values from `backend/.env` (and root `.env` as a fallback).
`npm run start:backend` always targets port `8010` and prefers `.venv/Scripts/python.exe` when present (falls back to `python` on PATH).

### One-command local startup with AWS credential export

If your AWS credentials are managed by AWS CLI (for example IAM Identity Center login), use:

```bash
npm run start:full:aws
```

This runs `aws configure export-credentials --profile default --format env-no-export` before starting the backend process so Bedrock/OpenSearch calls have credentials.

You can also start only the backend with credential export:

```bash
npm run start:backend:aws
```

If you want to use a specific AWS profile, set `AWS_PROFILE` first and run the profile-aware scripts:

```bash
set AWS_PROFILE=<your-profile-name>
npm run start:full:aws:profile
```

Backend-only variant:

```bash
set AWS_PROFILE=<your-profile-name>
npm run start:backend:aws:profile
```

### Option 2: Use deployed Lambda URL from companion backend

1. Deploy the `ragQueryStack` in the backend project and copy the `RagQueryApiUrl` output.
2. Set `public/runtime-config.js`:

```js
window.__IBIS_CONFIG__ = {
	RAG_API_URL: 'https://<your-function-url>.lambda-url.<region>.on.aws/'
};
```

3. Build/deploy this Angular app.

If `RAG_API_URL` is empty, the app falls back to `/api/bedrock/rag/query`.

### Polly-enabled response audio

The home page chatbot can now play synthesized speech returned by the backend.
If the RAG API response includes any of the following fields, the UI renders an audio player:

- `audioUrl`
- `audioBase64` with optional `audioMimeType`
- `audio.url` / `audio.base64` / `audio.mimeType`
- `speech.audioUrl` / `speech.audioBase64` / `speech.audioMimeType`

If no audio fields are returned, the chatbot continues to display text and sources only.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
