import { Component, Input } from '@angular/core';
import { CounterDirective } from '../../directives/counter.directive';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Animated skill progress bar: percentage counts up as the bar fills.
 */
@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [CounterDirective, RevealDirective],
  template: `
    <div class="skill" appReveal>
      <div class="skill__meta">
        <span class="skill__name">{{ name }}</span>
        <span class="skill__level" [appCounter]="level" [suffix]="'%'" [duration]="1300">{{ level }}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" [style.--fill-level]="level / 100"></div>
      </div>
    </div>
  `,
  styles: `
    .skill { margin-bottom: 1.15rem; }
    .skill__meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.45rem; }
    .skill__name { font-weight: 500; font-size: 0.95rem; }
    .skill__level {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      padding: 0.1rem 0.55rem;
      border-radius: 99px;
    }
    .skill-track { height: 8px; border-radius: 99px; overflow: hidden; background: color-mix(in srgb, var(--text-secondary) 14%, transparent); }
    .skill-fill {
      height: 100%;
      width: 0;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      animation: skill-grow 1.4s cubic-bezier(0.25, 1, 0.35, 1) forwards;
      box-shadow: 0 0 14px color-mix(in srgb, var(--primary) 45%, transparent);
    }
    @keyframes skill-grow {
      from { width: 0; }
      to { width: calc(var(--fill-level) * 100%); }
    }
  `,
})
export class SkillBarComponent {
  @Input() name = '';
  @Input() level = 0;
}
