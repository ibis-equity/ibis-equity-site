import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BedrockRagConfig, BedrockRagResponse, BedrockRagService } from './bedrock-rag.service';

@Component({
  selector: 'app-map-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './map-destination.html',
  styleUrl: './map-destination.css'
})
export class MapDestinationComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly ragService = inject(BedrockRagService);

  protected readonly icon = (this.route.snapshot.data['icon'] as string) || '◆';
  protected readonly iconTone = (this.route.snapshot.data['iconTone'] as string) || 'accent';
  protected readonly title = (this.route.snapshot.data['title'] as string) || 'Ibis Equity';
  protected readonly description = (this.route.snapshot.data['description'] as string) ||
    'This page provides additional details for the selected image map area.';
  protected readonly capabilities = (this.route.snapshot.data['capabilities'] as string[]) || [];
  protected readonly useCases = (this.route.snapshot.data['useCases'] as string[]) || [];
  protected readonly ragConfig = this.route.snapshot.data['rag'] as BedrockRagConfig | undefined;

  protected question = '';
  protected readonly isAsking = signal(false);
  protected readonly ragAnswer = signal('');
  protected readonly ragSources = signal<Array<{ title?: string; uri?: string; excerpt?: string }>>([]);
  protected readonly ragError = signal('');

  protected askRag(): void {
    const question = this.question.trim();
    if (!question || !this.ragConfig || this.isAsking()) {
      return;
    }

    this.isAsking.set(true);
    this.ragError.set('');

    this.ragService
      .query({
        sector: this.title,
        question,
        config: this.ragConfig
      })
      .subscribe({
        next: (response: BedrockRagResponse) => {
          this.ragAnswer.set(response.answer || 'No answer was returned from Bedrock.');
          this.ragSources.set(response.sources || []);
          this.isAsking.set(false);
        },
        error: () => {
          this.ragError.set('Unable to reach the Bedrock RAG endpoint. Verify your backend API is running.');
          this.isAsking.set(false);
        }
      });
  }
}
