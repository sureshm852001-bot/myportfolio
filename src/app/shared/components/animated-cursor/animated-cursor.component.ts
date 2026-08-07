import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

/**
 * Custom animated cursor: a precise dot plus a lagging ring.
 * Disabled automatically on touch devices and coarse pointers.
 */
@Component({
  selector: 'app-animated-cursor',
  standalone: true,
  template: `<div class="dot" #dot></div><div class="ring" #ring></div>`,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      pointer-events: none;
      display: none;
    }
    :host-context(body.custom-cursor) {
      display: block;
    }
    .dot, .ring {
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
      will-change: transform;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary);
      box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 80%, transparent);
    }
    .ring {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1.5px solid color-mix(in srgb, var(--primary) 65%, transparent);
      transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    }
    .ring--hover {
      width: 58px;
      height: 58px;
      border-color: var(--secondary);
      background: color-mix(in srgb, var(--secondary) 8%, transparent);
    }
  `,
})
export class AnimatedCursorComponent implements OnInit {
  @ViewChild('dot') private dotRef!: ElementRef<HTMLElement>;
  @ViewChild('ring') private ringRef!: ElementRef<HTMLElement>;

  private dot?: HTMLElement;
  private ring?: HTMLElement;
  private targetX = 0;
  private targetY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId = 0;

  ngOnInit(): void {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('custom-cursor');
  }

  ngAfterViewInit(): void {
    this.dot = this.dotRef.nativeElement;
    this.ring = this.ringRef.nativeElement;
    this.rafId = requestAnimationFrame(() => this.tick());
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
    this.dot?.style.setProperty('transform', `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`);
  }

  @HostListener('window:mouseover', ['$event'])
  onOver(event: MouseEvent): void {
    const target = (event.target as HTMLElement | null)?.closest(
      'a, button, [role="button"], input, textarea, select, label'
    );
    const hovering = !!target;
    this.ring?.classList.toggle('ring--hover', hovering);
  }

  private tick(): void {
    this.ringX += (this.targetX - this.ringX) * 0.16;
    this.ringY += (this.targetY - this.ringY) * 0.16;
    this.ring?.style.setProperty('transform', `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`);
    this.rafId = requestAnimationFrame(() => this.tick());
  }
}
