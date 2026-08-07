import { Component, HostListener, signal } from '@angular/core';

/**
 * Thin gradient bar at the top showing scroll progress.
 */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `<div class="scroll-progress" [style.transform]="'scaleX(' + progress() + ')'"></div>`,
})
export class ScrollProgressComponent {
  readonly progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(height > 0 ? Math.min(1, scrollTop / height) : 0);
  }
}
