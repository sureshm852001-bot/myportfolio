import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';

/**
 * Material-inspired ripple that springs from the click point.
 */
@Directive({
  selector: '[appRipple]',
  standalone: true,
})
export class RippleDirective implements OnDestroy {
  private readonly el: HTMLElement;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.el = elementRef.nativeElement;
    this.el.style.position = this.el.style.position || 'relative';
    this.el.style.overflow = this.el.style.overflow || 'hidden';
  }

  @HostListener('mousedown', ['$event'])
  onDown(event: MouseEvent): void {
    const rect = this.el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, color-mix(in srgb, var(--primary) 26%, transparent), transparent 70%);
      transform: scale(0);
      pointer-events: none;
      animation: ripple-expand 0.6s ease-out forwards;
    `;

    this.el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  ngOnDestroy(): void {
    this.el.querySelectorAll('span[style]').forEach((node) => node.remove());
  }
}
