import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Subtle 3D tilt / parallax that follows the pointer over the host element.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  /** Max tilt in degrees. Bound via the directive selector: [appTilt]="8" */
  @Input('appTilt') tiltMax = 8;

  private readonly el: HTMLElement;
  private rafId = 0;
  private currentX = 0;
  private currentY = 0;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const rect = this.el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.currentX = -px * this.tiltMax;
    this.currentY = py * this.tiltMax;
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.apply());
  }

  @HostListener('mouseleave')
  onLeave(): void {
    cancelAnimationFrame(this.rafId);
    this.currentX = 0;
    this.currentY = 0;
    this.rafId = requestAnimationFrame(() => this.apply());
  }

  private apply(): void {
    this.el.style.transform = `perspective(900px) rotateX(${this.currentY}deg) rotateY(${this.currentX}deg) translateY(-4px)`;
  }
}
