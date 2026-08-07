import { Component, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

/**
 * Soft radial light that tracks the mouse and tints the scene.
 */
@Component({
  selector: 'app-mouse-glow',
  standalone: true,
  template: `<div class="glow" [style.opacity]="opacity()"></div>`,
  styles: `
    :host { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
    .glow {
      position: fixed;
      width: 560px;
      height: 560px;
      border-radius: 50%;
      background: radial-gradient(circle, color-mix(in srgb, var(--primary) 9%, transparent), transparent 62%);
      transform: translate3d(var(--gx), var(--gy), 0) translate(-50%, -50%);
      transition: opacity 0.4s ease;
      will-change: transform;
    }
  `,
})
export class MouseGlowComponent {
  private readonly theme = inject(ThemeService);

  protected readonly glowStyles: Record<string, string> = {};

  opacity() {
    return this.theme.theme() === 'dark' ? 1 : 0.5;
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const el = document.querySelector('.glow') as HTMLElement | null;
    if (!el) return;
    el.style.setProperty('--gx', `${event.clientX}px`);
    el.style.setProperty('--gy', `${event.clientY}px`);
  }
}
