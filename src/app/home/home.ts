import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BedrockRagConfig, BedrockRagResponse, BedrockRagService } from '../map-destination/bedrock-rag.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private readonly ragService = inject(BedrockRagService);

  protected readonly title = signal('ibis-equity-site');
  protected readonly aboutModalOpen = signal(false);
  protected readonly responsibleModalOpen = signal(false);
  protected readonly ragConfig: BedrockRagConfig = {
    knowledgeBaseId: 'kb-data-sciences',
    modelId: 'anthropic.claude-3-5-sonnet',
    topK: 5,
    systemPrompt: 'You are the Ibis Equity assistant. Provide concise, practical guidance grounded in retrieved enterprise AI and data science context.'
  };
  protected ragQuestion = '';
  protected readonly ragAnswer = signal('');
  protected readonly ragError = signal('');
  protected readonly ragSources = signal<Array<{ title?: string; uri?: string; excerpt?: string }>>([]);
  protected readonly isAskingRag = signal(false);
  protected readonly chatbotOpen = signal(true);

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

  protected askRagFromHome(): void {
    const question = this.ragQuestion.trim();
    if (!question || this.isAskingRag()) {
      return;
    }

    this.isAskingRag.set(true);
    this.ragError.set('');

    this.ragService
      .query({
        sector: 'Ibis Equity Main Site',
        question,
        config: this.ragConfig
      })
      .subscribe({
        next: (response: BedrockRagResponse) => {
          this.ragAnswer.set(response.answer || 'No response returned from the Bedrock backend.');
          this.ragSources.set(response.sources || []);
          this.isAskingRag.set(false);
        },
        error: () => {
          this.ragError.set('Unable to reach ibis-equity-back-end RAG endpoint. Verify backend is running and CORS/proxy is configured.');
          this.isAskingRag.set(false);
        }
      });
  }

  protected toggleChatbot(): void {
    this.chatbotOpen.update((isOpen) => !isOpen);
  }
}
