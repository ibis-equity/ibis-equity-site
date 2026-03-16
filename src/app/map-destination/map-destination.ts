import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BedrockRagConfig, BedrockRagResponse, BedrockRagService } from './bedrock-rag.service';

interface LanguagePreference {
  instruction: string;
  voiceId: string;
  languageCode: string;
}

interface DestinationFeatureStep {
  title: string;
  description: string;
}

interface BulletItem {
  title: string;
  description?: string;
}

interface DestinationFeatureCard {
  name: string;
  role: string;
  description?: string;
  highlights: string[];
}

interface DestinationFeatureComparisonRow {
  dimension: string;
  ml: string;
  rag: string;
  dataScience: string;
}

interface DestinationFeatureSection {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: (string | BulletItem)[];
  steps?: DestinationFeatureStep[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidthPercent?: number;
  cardGridTitle?: string;
  cardGridSubtitle?: string;
  cardLayout?: 'default' | 'ai-stack' | 'ai-compare' | 'healthcare-pillars' | 'ml-rag-ds-comparison';
  cards?: DestinationFeatureCard[];
  comparisonRows?: DestinationFeatureComparisonRow[];
}

interface DestinationFeatureContent {
  title: string;
  subtitle?: string;
  intro?: string[];
  sections: DestinationFeatureSection[];
  closingTitle?: string;
  closingParagraphs?: string[];
  closingHighlight?: string;
}

const BEDROCK_CLAUDE_PROMPT = `Human: This is a friendly conversation between a human and an AI.
The AI is talkative and provides specific details from its context but limits it to 240 tokens.
If the AI does not know the answer to a question, it truthfully says it does not know.

Assistant: OK, got it, I'll be a talkative truthful AI assistant.

Human: Here are a few documents in <documents> tags:
<documents>
{context}
</documents>
Based on the above documents, provide a detailed answer for, {question}
Answer "don't know" if not present in the document.

Assistant:`;

const LANGUAGE_PREFERENCES: Record<string, LanguagePreference> = {
  English: { instruction: 'Respond in English.', voiceId: 'Joanna', languageCode: 'en-US' },
  Spanish: { instruction: 'Respond in Spanish.', voiceId: 'Lupe', languageCode: 'es-US' },
  French: { instruction: 'Respond in French.', voiceId: 'Lea', languageCode: 'fr-FR' },
  German: { instruction: 'Respond in German.', voiceId: 'Vicki', languageCode: 'de-DE' },
  Italian: { instruction: 'Respond in Italian.', voiceId: 'Bianca', languageCode: 'it-IT' },
  Portuguese: { instruction: 'Respond in Portuguese.', voiceId: 'Camila', languageCode: 'pt-BR' }
};

@Component({
  selector: 'app-map-destination',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './map-destination.html',
  styleUrl: './map-destination.css'
})
export class MapDestinationComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly ragService = inject(BedrockRagService);
  private generatedAudioObjectUrl: string | null = null;

  protected readonly icon = (this.route.snapshot.data['icon'] as string) || '◆';
  protected readonly iconTone = (this.route.snapshot.data['iconTone'] as string) || 'accent';
  protected readonly title = (this.route.snapshot.data['title'] as string) || 'Ibis Equity';
  protected readonly description = (this.route.snapshot.data['description'] as string) ||
    'This page provides additional details for the selected image map area.';
  protected readonly headerImageSrc = (this.route.snapshot.data['headerImageSrc'] as string | undefined) || '';
  protected readonly headerImageAlt =
    (this.route.snapshot.data['headerImageAlt'] as string | undefined) ||
    `${this.title} service image`;
  protected readonly capabilities = (this.route.snapshot.data['capabilities'] as string[]) || [];
  protected readonly useCases = (this.route.snapshot.data['useCases'] as string[]) || [];
  protected readonly featureContent = (this.route.snapshot.data['featureContent'] as DestinationFeatureContent | undefined) || null;
  protected readonly ragConfig: BedrockRagConfig = {
    knowledgeBaseId: (this.route.snapshot.data['knowledgeBaseId'] as string) || 'kb-data-sciences',
    modelId: 'amazon.nova-micro-v1:0',
    topK: 5,
    systemPrompt: BEDROCK_CLAUDE_PROMPT
  };
  protected ragQuestion = '';
  protected readonly ragAnswer = signal('');
  // Returns HTML string with simple markdown formatting (bullets, numbers, bold, italics)
  protected formatAnswerMarkdown(answer: string): string {
    if (!answer) return '';
    // Escape HTML
    let html = answer
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
    // Numbered lists: 1. ... 2. ...
    html = html.replace(/(^|\n)(\d+)\. (.*?)(?=\n|$)/g, '$1<ol><li>$3</li></ol>');
    // Bulleted lists: - ... or * ...
    html = html.replace(/(^|\n)[\-*] (.*?)(?=\n|$)/g, '$1<ul><li>$2</li></ul>');
    // Merge adjacent <ul> or <ol>
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    html = html.replace(/<\/ol>\s*<ol>/g, '');
    return html;
  }
  protected readonly ragError = signal('');
  protected readonly isAskingRag = signal(false);
  protected readonly chatbotOpen = signal(false);
  protected readonly speechEnabled = signal(true);
  protected readonly ragAudioSrc = signal('');
  protected readonly ragAudioError = signal('');
  protected readonly languageOptions = Object.keys(LANGUAGE_PREFERENCES);
  protected preferredLanguage = 'English';

  protected askRagFromDestination(): void {
    const question = this.ragQuestion.trim();
    if (!question || this.isAskingRag()) {
      return;
    }

    const languageConfig = this.getLanguageConfig();
    const questionWithLanguageInstruction = `${question}\n\n${languageConfig.instruction}`;

    this.isAskingRag.set(true);
    this.ragError.set('');

    this.ragService
      .query({
        sector: this.title,
        question: questionWithLanguageInstruction,
        config: {
          ...this.ragConfig,
          speechEnabled: this.speechEnabled(),
          voiceId: languageConfig.voiceId,
          languageCode: languageConfig.languageCode
        }
      })
      .subscribe({
        next: (response: BedrockRagResponse) => {
          this.ragAnswer.set(response.answer || 'No response returned from the Bedrock backend.');
          this.applyPollyAudio(response);
          this.isAskingRag.set(false);
        },
        error: (error: unknown) => {
          this.ragError.set(this.formatRagErrorMessage(error));
          this.isAskingRag.set(false);
        }
      });
  }

  protected submitQuestionFromKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey || keyboardEvent.isComposing) {
      return;
    }

    keyboardEvent.preventDefault();
    this.askRagFromDestination();
  }

  protected clearQuestionBox(): void {
    this.ragQuestion = '';
  }

  protected clearAnswerBox(): void {
    this.ragAnswer.set('');
    this.ragError.set('');
    this.releaseGeneratedAudioUrl();
    this.ragAudioSrc.set('');
    this.ragAudioError.set('');
  }

  protected toggleChatbot(): void {
    this.chatbotOpen.update((isOpen) => !isOpen);
  }

  protected toggleSpeech(): void {
    this.speechEnabled.update((enabled) => !enabled);
    if (!this.speechEnabled()) {
      this.releaseGeneratedAudioUrl();
      this.ragAudioSrc.set('');
      this.ragAudioError.set('');
    }
  }

  ngOnDestroy(): void {
    this.releaseGeneratedAudioUrl();
  }

  private applyPollyAudio(response: BedrockRagResponse): void {
    this.releaseGeneratedAudioUrl();
    this.ragAudioError.set('');

    const directUrl =
      response.audioUrl?.trim() ||
      response.audio?.url?.trim() ||
      response.speech?.audioUrl?.trim() ||
      '';

    if (directUrl) {
      this.ragAudioSrc.set(directUrl);
      return;
    }

    const base64Audio =
      response.audioBase64?.trim() ||
      response.audio?.base64?.trim() ||
      response.speech?.audioBase64?.trim() ||
      '';

    if (!base64Audio) {
      this.ragAudioSrc.set('');
      return;
    }

    try {
      const mimeType =
        response.audioMimeType ||
        response.audio?.mimeType ||
        response.speech?.audioMimeType ||
        'audio/mpeg';
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mimeType });
      const objectUrl = URL.createObjectURL(blob);
      this.generatedAudioObjectUrl = objectUrl;
      this.ragAudioSrc.set(objectUrl);
    } catch {
      this.ragAudioSrc.set('');
      this.ragAudioError.set('Polly audio was returned in an unsupported format.');
    }
  }

  private releaseGeneratedAudioUrl(): void {
    if (!this.generatedAudioObjectUrl) {
      return;
    }
    URL.revokeObjectURL(this.generatedAudioObjectUrl);
    this.generatedAudioObjectUrl = null;
  }

  private getLanguageConfig(): LanguagePreference {
    return LANGUAGE_PREFERENCES[this.preferredLanguage] || LANGUAGE_PREFERENCES['English'];
  }

  private formatRagErrorMessage(error: unknown): string {
    const fallbackMessage = 'Unable to reach ibis-equity-back-end RAG endpoint. Verify backend is running and CORS/proxy is configured.';

    if (!(error instanceof HttpErrorResponse)) {
      return fallbackMessage;
    }

    if (error.status === 0) {
      return 'ibis-equity-back-end network error: Request could not reach /api/bedrock/rag/query. Ensure the Angular dev server is running and backend is available.';
    }

    const detail =
      (typeof error.error === 'object' && error.error && 'detail' in error.error && typeof error.error.detail === 'string'
        ? error.error.detail
        : undefined) ||
      (typeof error.error === 'string' ? error.error : undefined) ||
      error.message;

    if (!detail?.trim()) {
      return fallbackMessage;
    }

    return `ibis-equity-back-end error (${error.status || 'unknown'}): ${detail.trim()}`;
  }
}
