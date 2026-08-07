import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Consistent animated section heading: eyebrow label, big title and optional description.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <div class="heading" appReveal>
      <div class="heading__eyebrow">{{ label }}</div>
      <h2 class="heading__title">{{ title }}</h2>
      <p class="heading__desc" *ngIf="description">{{ description }}</p>
      <div class="heading__rule"><span></span></div>
    </div>
  `,
  styles: `
    .heading { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 3.5rem; }
    .heading__eyebrow {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 0.8rem;
    }
    .heading__title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4.5vw, 3rem);
      font-weight: 700;
      line-height: 1.1;
      margin: 0;
    }
    .heading__desc { max-width: 42rem; color: var(--text-secondary); font-size: 1.02rem; margin: 1rem 0 0; }
    .heading__rule { margin-top: 1.5rem; width: 90px; height: 3px; border-radius: 99px; overflow: hidden; }
    .heading__rule span { display: block; width: 100%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); animation: gradient-shift 4s ease infinite; }
  `,
})
export class SectionHeadingComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() description?: string;
}
