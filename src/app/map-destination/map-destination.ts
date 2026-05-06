import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
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
  ml?: string;
  rag?: string;
  dataScience?: string;
  aws?: string;
  azure?: string;
  gcp?: string;
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
  cardLayout?: 'default' | 'ai-stack' | 'ai-compare' | 'healthcare-pillars' | 'ml-rag-ds-comparison' | 'multi-cloud-matrix' | 'insurance-architecture' | 'education-architecture' | 'education-sector-architecture' | 'realestate-sector-architecture' | 'government-sector-architecture' | 'retail-sector-architecture' | 'manufacturing-sector-architecture' | 'hospitality-sector-architecture' | 'transportation-sector-architecture';
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
  private imagePreviewCloseTimeoutId: number | null = null;

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
  protected readonly destinationId = (this.route.snapshot.data['destinationId'] as string | undefined) || null;
  protected readonly hideFeatureStory = (this.route.snapshot.data['hideFeatureStory'] as boolean | undefined) ?? false;
  protected readonly routeRagConfig =
    (this.route.snapshot.data['rag'] as Partial<BedrockRagConfig> | undefined) || {};
  protected readonly ragConfig: BedrockRagConfig = {
    knowledgeBaseId: this.routeRagConfig.knowledgeBaseId || 'kb-data-sciences',
    modelId: this.routeRagConfig.modelId || 'amazon.nova-micro-v1:0',
    topK: this.routeRagConfig.topK || 5,
    systemPrompt: this.routeRagConfig.systemPrompt || BEDROCK_CLAUDE_PROMPT
  };
  protected ragQuestion = '';
  protected readonly ragAnswer = signal('');
  protected readonly ragSources = signal<BedrockRagResponse['sources']>([]);
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

    // Convert URLs into links. Image URLs are marked for in-app preview popup handling.
    html = html.replace(/(https?:\/\/[^\s<]+)/g, (rawUrl: string) => {
      const trailingPunctuationMatch = rawUrl.match(/[),.;:!?]+$/);
      const trailingPunctuation = trailingPunctuationMatch ? trailingPunctuationMatch[0] : '';
      const cleanUrl = trailingPunctuation ? rawUrl.slice(0, -trailingPunctuation.length) : rawUrl;
      const href = cleanUrl.replace(/"/g, '&quot;');
      const isImageUrl = /\.(?:png|jpe?g|webp|gif)(?:$|[?#&])/i.test(cleanUrl);

      if (isImageUrl) {
        return `<a class="main-chatbot__answer-link main-chatbot__answer-link--image" href="${href}" target="_blank" rel="noopener noreferrer">Image URL</a>${trailingPunctuation}`;
      }

      return `<a class="main-chatbot__answer-link" href="${href}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${trailingPunctuation}`;
    });

    return html;
  }
  protected readonly ragError = signal('');
  protected readonly isAskingRag = signal(false);
  protected readonly chatbotOpen = signal(false);
  protected readonly assistantInfoOpen = signal(false);
  protected readonly speechEnabled = signal(this.routeRagConfig.speechEnabled ?? false);
  protected readonly ragAudioSrc = signal('');
  protected readonly ragAudioError = signal('');
  protected readonly imagePreviewSrc = signal('');
  protected readonly imagePreviewAlt = signal('');
  protected readonly imagePreviewClosing = signal(false);
  protected readonly imagePreviewOpen = computed(() => !!this.imagePreviewSrc());
  protected readonly imagePreviewVisible = computed(() => this.imagePreviewOpen() || this.imagePreviewClosing());
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
    this.ragSources.set([]);

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
          this.ragSources.set(response.sources || []);
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
    this.ragSources.set([]);
    this.ragError.set('');
    this.releaseGeneratedAudioUrl();
    this.ragAudioSrc.set('');
    this.ragAudioError.set('');
  }

  protected toggleChatbot(): void {
    this.chatbotOpen.update((isOpen) => !isOpen);
  }

  protected toggleAssistantInfo(): void {
    this.assistantInfoOpen.update((isOpen) => !isOpen);
  }

  protected closeAssistantInfo(): void {
    this.assistantInfoOpen.set(false);

    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.assistantInfoOpen()) {
      return;
    }

    const { target } = event;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest('.main-chatbot__assistant-info')) {
      return;
    }

    this.closeAssistantInfo();
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    if (this.imagePreviewVisible()) {
      this.closeImagePreview();
      return;
    }

    if (!this.assistantInfoOpen()) {
      return;
    }

    this.closeAssistantInfo();
  }

  protected listenToAnswer(): void {
    const audioSource = this.ragAudioSrc().trim();
    if (!audioSource) {
      this.ragAudioError.set('No generated audio yet. Submit a question first, then tap Listen.');
      return;
    }

    this.ragAudioError.set('');
    if (typeof document === 'undefined') {
      return;
    }

    const audioElement = document.getElementById('destination-rag-audio') as HTMLAudioElement | null;
    if (!audioElement) {
      return;
    }

    const playback = audioElement.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        this.ragAudioError.set('Tap the audio player controls below to start playback on this device.');
      });
    }
  }

  protected toggleSpeech(): void {
    this.speechEnabled.update((enabled) => !enabled);
    if (!this.speechEnabled()) {
      this.releaseGeneratedAudioUrl();
      this.ragAudioSrc.set('');
      this.ragAudioError.set('');
    }
  }

  protected toggleCodeBlock(event: Event): void {
    if (typeof window === 'undefined' || window.innerWidth > 560) {
      return;
    }

    const pre = event.currentTarget as HTMLElement | null;
    if (!pre) {
      return;
    }

    pre.classList.toggle('is-expanded');
  }

  protected openImagePreview(event: Event, imageSrc: string, imageAlt: string): void {
    event.preventDefault();
    event.stopPropagation();

    const normalizedSrc = imageSrc.trim();
    if (!normalizedSrc) {
      return;
    }

    this.clearImagePreviewCloseTimeout();
    this.imagePreviewClosing.set(false);
    this.imagePreviewSrc.set(normalizedSrc);
    this.imagePreviewAlt.set(imageAlt.trim() || 'Expanded image preview');
  }

  protected onAnswerLinkClick(event: Event): void {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a') as HTMLAnchorElement | null;
    if (!link) {
      return;
    }

    const href = (link.getAttribute('href') || '').trim();
    const isImageLink =
      link.classList.contains('main-chatbot__answer-link--image') ||
      /\.(?:png|jpe?g|webp|gif)(?:$|[?#&])/i.test(href) ||
      (link.textContent || '').trim().toLowerCase() === 'image url';

    if (!isImageLink) {
      return;
    }

    const imageSrc = href;
    if (!imageSrc) {
      return;
    }

    const imageAlt = (link.textContent || 'Image preview').trim();
    this.openImagePreview(event, imageSrc, imageAlt);
  }

  protected getSourceImagePreviewUrl(source: { imageUrl?: string; uri?: string } | null | undefined): string {
    const imageUrl = source?.imageUrl?.trim() || '';
    if (imageUrl) {
      return imageUrl;
    }

    const uri = source?.uri?.trim() || '';
    const isHttpImage = /^https?:\/\//i.test(uri) && /\.(?:png|jpe?g|webp|gif)(?:$|[?#])/i.test(uri);
    return isHttpImage ? uri : '';
  }

  protected closeImagePreview(): void {
    if (!this.imagePreviewVisible()) {
      return;
    }

    this.clearImagePreviewCloseTimeout();
    this.imagePreviewClosing.set(true);
    this.imagePreviewCloseTimeoutId = window.setTimeout(() => {
      this.imagePreviewSrc.set('');
      this.imagePreviewAlt.set('');
      this.imagePreviewClosing.set(false);
      this.imagePreviewCloseTimeoutId = null;
    }, 220);
  }

  ngOnDestroy(): void {
    this.clearImagePreviewCloseTimeout();
    this.releaseGeneratedAudioUrl();
  }

  private clearImagePreviewCloseTimeout(): void {
    if (this.imagePreviewCloseTimeoutId === null) {
      return;
    }

    clearTimeout(this.imagePreviewCloseTimeoutId);
    this.imagePreviewCloseTimeoutId = null;
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

    if (error.status === 401 && detail && /expiredtokenexception|expired token|aws session expired/i.test(detail)) {
      return 'ibis-equity-back-end authentication error: AWS session expired. Run aws login, then restart backend with npm run start:backend:aws.';
    }

    if (!detail?.trim()) {
      return fallbackMessage;
    }

    return `ibis-equity-back-end error (${error.status || 'unknown'}): ${detail.trim()}`;
  }
}
