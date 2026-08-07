import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Animates a numeric value from 0 to the target when the element scrolls into view.
 * Usage: <span appCounter [target]="95" [duration]="1600" suffix="%"></span>
 */
@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective implements OnInit, OnDestroy {
  /** Target value. Bound via the directive selector: [appCounter]="95" */
  @Input('appCounter') target = 0;
  @Input() duration = 1600;
  @Input() suffix = '';
  @Input() prefix = '';

  private readonly el: HTMLElement;
  private observer?: IntersectionObserver;
  private rafId = 0;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.el.textContent = `${this.prefix}0${this.suffix}`;

    if (typeof IntersectionObserver === 'undefined') {
      this.render(this.target);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.animate();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  private animate(): void {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / this.duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.render(Math.round(this.target * eased));
      if (progress < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };
    this.rafId = requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.el.textContent = `${this.prefix}${value}${this.suffix}`;
  }
}
