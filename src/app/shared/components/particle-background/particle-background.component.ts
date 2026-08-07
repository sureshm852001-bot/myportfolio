import { Component, ElementRef, OnInit, inject } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

/**
 * Lightweight canvas particle-network background.
 * Particles drift and link with a line whenever they get close enough.
 */
@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host { display: block; position: absolute; inset: 0; z-index: 0; overflow: hidden; }
    canvas { width: 100%; height: 100%; display: block; }
  `,
})
export class ParticleBackgroundComponent implements OnInit {
  private readonly host = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    const canvas = this.host.nativeElement.querySelector('canvas')!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationId = 0;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const linkDistance = 130;
    const maxParticles = window.innerWidth < 768 ? 42 : 85;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: maxParticles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1 + Math.random() * 1.8,
        hue: Math.random() > 0.5 ? 188 : 262,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.8)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(190, 100%, 70%, ${(1 - dist / linkDistance) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(step);
    };

    resize();
    if (reduceMotion) {
      seed();
      step();
      cancelAnimationFrame(animationId);
    } else {
      seed();
      step();
    }

    window.addEventListener('resize', () => {
      resize();
      seed();
    });
  }
}
