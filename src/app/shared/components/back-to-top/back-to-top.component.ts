import { Component, HostListener, signal } from '@angular/core';

/**
 * Floating "back to top" button that appears after scrolling down.
 */
@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    <button class="back-to-top" [class.visible]="visible()" (click)="scrollToTop()" aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path>
      </svg>
    </button>
  `,
})
export class BackToTopComponent {
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 480);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
