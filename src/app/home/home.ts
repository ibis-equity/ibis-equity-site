import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  protected readonly title = signal('ibis-equity-site');
  protected readonly aboutModalOpen = signal(false);
  protected readonly responsibleModalOpen = signal(false);

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
}
