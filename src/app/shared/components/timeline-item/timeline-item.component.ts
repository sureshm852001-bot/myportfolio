import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Reusable timeline entry used by Experience and Education timelines.
 */
@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <div class="timeline-item" appReveal>
      <div class="timeline-item__dot">
        <span class="timeline-item__dot-inner"></span>
      </div>
      <div class="timeline-item__card panel-card">
        <div class="timeline-item__header">
          <div>
            <h3 class="timeline-item__title">{{ title }}</h3>
            <div class="timeline-item__subtitle">
              <span *ngIf="subtitle">{{ subtitle }}</span>
              <span class="timeline-item__sep" *ngIf="subtitle && location">&middot;</span>
              <span *ngIf="location">{{ location }}</span>
            </div>
          </div>
          <span class="timeline-item__period">{{ period }}</span>
        </div>
        <p class="timeline-item__summary" *ngIf="summary">{{ summary }}</p>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    .timeline-item {
      position: relative;
      padding-left: 3rem;
      padding-bottom: 2.4rem;
    }
    .timeline-item:last-child { padding-bottom: 0; }
    .timeline-item__dot {
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 2.1rem;
      height: 2.1rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 12%, transparent);
    }
    .timeline-item__dot-inner {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      animation: pulse-glow 2.4s ease infinite;
    }
    .timeline-item__card { padding: 1.4rem 1.5rem; }
    .timeline-item__header { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; align-items: baseline; }
    .timeline-item__title { font-size: 1.12rem; font-weight: 700; margin: 0 0 0.3rem; }
    .timeline-item__subtitle { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; color: var(--text-secondary); font-size: 0.88rem; }
    .timeline-item__period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      white-space: nowrap;
    }
    .timeline-item__summary { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin: 0.8rem 0 0; }
  `,
})
export class TimelineItemComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() location = '';
  @Input() period = '';
  @Input() summary = '';
}
