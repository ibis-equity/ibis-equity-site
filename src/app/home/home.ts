import { Component, OnDestroy, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BedrockRagConfig, BedrockRagResponse, BedrockRagService, BedrockRagSource } from '../map-destination/bedrock-rag.service';

interface LanguagePreference {
  instruction: string;
  voiceId: string;
  languageCode: string;
}

interface ContactSubmissionRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organization: string;
  request: string;
}

interface ContactSubmissionResponse {
  status: string;
  submissionId: string;
  emailSent: boolean;
  smsSent: boolean;
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
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnDestroy {
    submitButtonHovered = false;
  private readonly http = inject(HttpClient);
  private readonly ragService = inject(BedrockRagService);
  private generatedAudioObjectUrl: string | null = null;

  protected readonly title = signal('ibis-equity-site');
  protected readonly aboutModalOpen = signal(false);
  protected readonly responsibleModalOpen = signal(false);
  protected readonly contactModalOpen = signal(false);
  protected readonly contactSubmitted = signal(false);
  protected readonly contactSubmitting = signal(false);
  protected readonly contactSubmitError = signal('');
  protected contactFirstName = '';
  protected contactLastName = '';
  protected contactEmailAddress = '';
  protected contactPhoneNumber = '';
  protected contactOrganization = '';
  protected contactRequest = '';
  protected readonly ragConfig: BedrockRagConfig = {
    knowledgeBaseId: 'kb-data-sciences',
    modelId: 'amazon.nova-micro-v1:0',
    topK: 5,
    systemPrompt: BEDROCK_CLAUDE_PROMPT
  };
  protected readonly bedrockClaudePrompt = BEDROCK_CLAUDE_PROMPT;
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
  protected readonly ragSources = signal<BedrockRagSource[]>([]);
  protected readonly isAskingRag = signal(false);
  protected readonly chatbotOpen = signal(true);
  protected readonly speechEnabled = signal(true);
  protected readonly ragAudioSrc = signal('');
  protected readonly ragAudioError = signal('');
  protected readonly languageOptions = Object.keys(LANGUAGE_PREFERENCES);
  protected preferredLanguage = 'English';
  protected selectedSource = '';

  protected openAboutModal(event: Event): void {
    event.preventDefault();
    this.aboutModalOpen.set(true);
  }

  protected closeAboutModal(): void {
    this.aboutModalOpen.set(false);
  }

  protected openResponsibleModal(event: Event): void {
    event.preventDefault();
    this.responsibleModalOpen.set(true);
  }

  protected closeResponsibleModal(): void {
    this.responsibleModalOpen.set(false);
  }

  protected openContactModal(event: Event): void {
    event.preventDefault();
    this.contactSubmitted.set(false);
    this.contactSubmitError.set('');
    this.contactModalOpen.set(true);
  }

  protected closeContactModal(): void {
    this.contactModalOpen.set(false);
  }

  protected submitContactForm(): void {
    if (this.contactSubmitting()) {
      return;
    }

    this.contactSubmitting.set(true);
    this.contactSubmitted.set(false);
    this.contactSubmitError.set('');

    const payload: ContactSubmissionRequest = {
      firstName: this.contactFirstName.trim(),
      lastName: this.contactLastName.trim(),
      emailAddress: this.contactEmailAddress.trim(),
      phoneNumber: this.contactPhoneNumber.trim(),
      organization: this.contactOrganization.trim(),
      request: this.contactRequest.trim(),
    };

    this.http.post<ContactSubmissionResponse>('/api/contact/submit', payload).subscribe({
      next: () => {
        this.contactSubmitted.set(true);
        this.contactSubmitting.set(false);
      },
      error: (error: unknown) => {
        this.contactSubmitError.set(this.formatContactErrorMessage(error));
        this.contactSubmitting.set(false);
      }
    });
  }

  protected askRagFromHome(): void {
    const question = this.ragQuestion.trim();
    if (!question || this.isAskingRag()) {
      return;
    }

    const languageConfig = this.getLanguageConfig();
    const questionWithLanguageInstruction = `${question}\n\n${languageConfig.instruction}`;

    this.isAskingRag.set(true);
    this.submitButtonHovered = false;
    this.ragError.set('');
    this.ragSources.set([]);
    this.selectedSource = '';

    this.ragService
      .query({
        sector: 'Ibis Equity Main Site',
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
          const matchedSources = this.getMatchedSources(response.answer, response.sources);
          this.ragSources.set(matchedSources);
          this.selectedSource = matchedSources[0]?.uri || matchedSources[0]?.title || '';
          this.applyPollyAudio(response);
          this.isAskingRag.set(false);
        },
        error: (error: unknown) => {
          this.ragError.set(this.formatRagErrorMessage(error));
          this.ragSources.set([]);
          this.selectedSource = '';
          this.isAskingRag.set(false);
        }
      });
  }

  onSubmitButtonMouseEnter(): void {
    if (this.isAskingRag()) {
      this.submitButtonHovered = true;
    }
  }
  onSubmitButtonMouseLeave(): void {
    this.submitButtonHovered = false;
  }

  protected submitQuestionFromKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey || keyboardEvent.isComposing) {
      return;
    }

    keyboardEvent.preventDefault();
    this.askRagFromHome();
  }

  protected clearQuestionBox(): void {
    this.ragQuestion = '';
    this.ragSources.set([]);
    this.selectedSource = '';
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

  private getMatchedSources(answer: string | undefined, sources: BedrockRagSource[] | undefined): BedrockRagSource[] {
    if (!answer || !sources?.length) {
      return [];
    }

    const normalizedAnswer = this.normalizeSearchText(answer);
    const successfulAnswer = normalizedAnswer && normalizedAnswer !== 'dont know';
    if (!successfulAnswer) {
      return [];
    }

    const rankedSources = sources
      .map((source) => ({ source, score: this.scoreSourceMatch(normalizedAnswer, source) }))
      .sort((left, right) => right.score - left.score);

    const bestSource = rankedSources[0]?.source;
    return bestSource ? [bestSource] : [];
  }

  private scoreSourceMatch(normalizedAnswer: string, source: BedrockRagSource): number {
    const normalizedTitle = this.normalizeSearchText(source.title || '');
    const normalizedUri = this.normalizeSearchText(source.uri || '');
    const normalizedExcerpt = this.normalizeSearchText(source.excerpt || '');

    let score = 0;

    if (normalizedExcerpt) {
      const excerptWords = normalizedExcerpt.split(' ').filter((word) => word.length > 3);
      score += excerptWords.reduce((total, word) => total + (normalizedAnswer.includes(word) ? 1 : 0), 0);
    }

    if (normalizedTitle && normalizedAnswer.includes(normalizedTitle)) {
      score += 10;
    }

    if (normalizedUri && normalizedAnswer.includes(normalizedUri)) {
      score += 10;
    }

    return score;
  }

  private normalizeSearchText(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private formatRagErrorMessage(error: unknown): string {
    const fallbackMessage = 'Unable to reach ibis-equity-back-end RAG endpoint. Verify backend is running and CORS/proxy is configured.';

    if (!(error instanceof HttpErrorResponse)) {
      return fallbackMessage;
    }

    if (error.status === 0) {
      return 'ibis-equity-back-end network error: Request could not reach /api/bedrock/rag/query. Ensure the Angular dev server is running on http://localhost:4200 and backend is running on http://localhost:8001.';
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

    const normalizedDetail = detail.trim();
    const friendlyMessage = this.mapKnownBackendError(normalizedDetail);

    return `ibis-equity-back-end error (${error.status || 'unknown'}): ${friendlyMessage}`;
  }

  private mapKnownBackendError(detail: string): string {
    const missingEnvMatch = detail.match(/^([A-Z0-9_]+) environment variable is required$/);
    if (missingEnvMatch) {
      const missingVariable = missingEnvMatch[1];
      return `Missing backend environment variable ${missingVariable}. Set AOSS_ID, AOSS_AWS_REGION, AOSS_INDEX_NAME, and BEDROCK_CHAT_MODEL_ID, then restart the backend.`;
    }

    if (detail === 'Internal server error') {
      return 'Backend request failed unexpectedly. Check backend logs for the stack trace and AWS connectivity.';
    }

    return detail;
  }

  private formatContactErrorMessage(error: unknown): string {
    const fallbackMessage = 'Unable to submit your request right now. Please try again.';

    if (!(error instanceof HttpErrorResponse)) {
      return fallbackMessage;
    }

    if (error.status === 0) {
      return 'Contact submission could not reach the backend. Verify the backend is running on http://localhost:8010.';
    }

    const detail =
      (typeof error.error === 'object' && error.error && 'detail' in error.error && typeof error.error.detail === 'string'
        ? error.error.detail
        : undefined) ||
      (typeof error.error === 'string' ? error.error : undefined) ||
      error.message;

    return detail?.trim() || fallbackMessage;
  }
}
