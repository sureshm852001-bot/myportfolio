import { Component, Input } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';

/**
 * Reusable glassmorphism card wrapper with optional 3D tilt.
 */
@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [TiltDirective],
  template: `
    <div class="glass-card" [class]="className" [class.glass-card--tilt]="tilt" [appTilt]="tiltMax">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .glass-card {
      position: relative;
      border-radius: 1.25rem;
      padding: 1.75rem;
      background: var(--card-soft);
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      border: 1px solid var(--glass-border);
      box-shadow: 0 12px 40px -14px var(--shadow-color);
      transition: border-color 0.35s ease, box-shadow 0.35s ease;
      will-change: transform;
    }
    .glass-card:hover {
      border-color: color-mix(in srgb, var(--primary) 45%, var(--glass-border));
      box-shadow: 0 22px 60px -20px var(--shadow-color), 0 0 34px -14px color-mix(in srgb, var(--primary) 40%, transparent);
    }
    .glass-card--tilt { transform-style: preserve-3d; }
  `,
})
export class GlassCardComponent {
  @Input() className = '';
  @Input() tilt = false;
  @Input() tiltMax = 8;
}
