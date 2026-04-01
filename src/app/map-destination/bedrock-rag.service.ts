import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BedrockRagConfig {
  knowledgeBaseId: string;
  modelId: string;
  topK: number;
  systemPrompt: string;
  speechEnabled?: boolean;
  voiceId?: string;
  engine?: string;
  languageCode?: string;
}

export interface BedrockRagSource {
  title?: string;
  uri?: string;
  excerpt?: string;
  imageUri?: string;
  imageUrl?: string;
}

export interface BedrockRagRequest {
  sector: string;
  question: string;
  config: BedrockRagConfig;
}

export interface BedrockRagResponse {
  answer: string;
  sources?: BedrockRagSource[];
  audioUrl?: string;
  audioBase64?: string;
  audioMimeType?: string;
  audio?: {
    url?: string;
    base64?: string;
    mimeType?: string;
  };
  speech?: {
    audioUrl?: string;
    audioBase64?: string;
    audioMimeType?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BedrockRagService {
  private readonly http = inject(HttpClient);
  private readonly ragApiUrl = this.resolveRagApiUrl();

  private resolveRagApiUrl(): string {
    const config = (window as Window & { __IBIS_CONFIG__?: { RAG_API_URL?: string } }).__IBIS_CONFIG__;
    const configuredUrl = config?.RAG_API_URL?.trim();
    if (configuredUrl) {
      return configuredUrl;
    }
    return '/api/bedrock/rag/query';
  }

  query(request: BedrockRagRequest): Observable<BedrockRagResponse> {
    return this.http.post<BedrockRagResponse>(this.ragApiUrl, request);
  }
}
