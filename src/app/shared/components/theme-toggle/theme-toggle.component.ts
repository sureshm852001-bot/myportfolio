import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { RippleDirective } from '../../directives/ripple.directive';

/**
 * Animated dark / light theme switch.
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, RippleDirective],
  template: `
    <button class="toggle" [class.toggle--light]="themeService.theme() === 'light'"
            (click)="themeService.toggle()" [attr.aria-label]="label" appRipple>
      <span class="toggle__track">
        <span class="toggle__thumb">
          <svg *ngIf="themeService.theme() === 'dark'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
          <svg *ngIf="themeService.theme() === 'light'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
          </svg>
        </span>
      </span>
    </button>
  `,
  styles: `
    .toggle {
      position: relative;
      width: 62px;
      height: 32px;
      border-radius: 99px;
      border: 1px solid var(--border);
      background: var(--card);
      cursor: pointer;
      padding: 0;
      transition: background 0.4s ease, border-color 0.4s ease;
    }
    .toggle__track { position: absolute; inset: 3px; border-radius: 99px; overflow: hidden; }
    .toggle__thumb {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--bg);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      box-shadow: 0 4px 12px -2px color-mix(in srgb, var(--primary) 50%, transparent);
      transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
    }
    .toggle--light .toggle__thumb { transform: translateX(29px); }
    .icon { width: 15px; height: 15px; }
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  get label(): string {
    return this.themeService.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }
}
