import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-map-destination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './map-destination.html',
  styleUrl: './map-destination.css'
})
export class MapDestinationComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly icon = (this.route.snapshot.data['icon'] as string) || '◆';
  protected readonly iconTone = (this.route.snapshot.data['iconTone'] as string) || 'accent';
  protected readonly title = (this.route.snapshot.data['title'] as string) || 'Ibis Equity';
  protected readonly description = (this.route.snapshot.data['description'] as string) ||
    'This page provides additional details for the selected image map area.';
  protected readonly capabilities = (this.route.snapshot.data['capabilities'] as string[]) || [];
  protected readonly useCases = (this.route.snapshot.data['useCases'] as string[]) || [];
}
