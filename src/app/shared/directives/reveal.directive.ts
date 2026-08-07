import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Reveals the host element with a smooth fade-up transition when it
 * scrolls into view. Add the `reveal-hidden` / `reveal-visible` styles
 * defined in the global stylesheet.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() delay = 0;
  @Input() once = true;

  private observer?: IntersectionObserver;
  private readonly el: HTMLElement;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (this.el.dataset['revealHandled'] === 'true') return;
    this.el.dataset['revealHandled'] = 'true';

    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('reveal-visible');
      return;
    }

    this.el.classList.add('reveal-hidden');
    if (this.delay) this.el.style.transitionDelay = `${this.delay}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.classList.add('reveal-visible');
            this.el.classList.remove('reveal-hidden');
            if (this.once) this.observer?.disconnect();
          } else if (!this.once) {
            this.el.classList.remove('reveal-visible');
            this.el.classList.add('reveal-hidden');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
