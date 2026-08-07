import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Site footer with navigation, contact channels and social links.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer__glow"></div>
      <div class="footer__inner">
        <div class="footer__brand">
          <div class="footer__logo">
            <span class="footer__monogram">SM</span>
            <div>
              <div class="footer__name">Sureshkumar M</div>
              <div class="footer__role">Java Full Stack Developer</div>
            </div>
          </div>
          <p class="footer__tagline">
            Building scalable, secure and elegant full-stack applications
            with Java, Spring Boot and Angular.
          </p>
          <div class="footer__social">
            <a href="https://www.linkedin.com/in/sureshkumar-m-665981227/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
            </a>
            <a href="mailto:sureshm.852001@gmail.com" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </a>
            <a href="tel:+919786271736" aria-label="Phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
            </a>
          </div>
        </div>

        <div class="footer__col">
          <h4>Explore</h4>
          <a routerLink="/home">Home</a>
          <a routerLink="/about">About</a>
          <a routerLink="/skills">Skills</a>
          <a routerLink="/projects">Projects</a>
          <a routerLink="/contact">Contact</a>
        </div>

        <div class="footer__col">
          <h4>More</h4>
          <a routerLink="/experience">Experience</a>
          <a routerLink="/education">Education</a>
        </div>

        <div class="footer__col">
          <h4>Contact</h4>
          <span>sureshm.852001@gmail.com</span>
          <span>+91 97862 71736</span>
          <span>Chennai, Tamil Nadu, India</span>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ year }} Sureshkumar M. Crafted with Java, Angular &amp; too much coffee.</p>
      </div>
    </footer>
  `,
  styles: `
    .footer { position: relative; border-top: 1px solid var(--border); background: var(--bg-soft); margin-top: 6rem; overflow: hidden; }
    .footer__glow {
      position: absolute;
      top: -160px;
      left: 50%;
      transform: translateX(-50%);
      width: 640px;
      height: 320px;
      background: radial-gradient(ellipse, color-mix(in srgb, var(--secondary) 14%, transparent), transparent 70%);
      pointer-events: none;
    }
    .footer__inner {
      position: relative;
      max-width: 80rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      padding: 4.5rem 1.5rem 2.5rem;
    }
    @media (min-width: 768px) {
      .footer__inner { grid-template-columns: 1.6fr 1fr 1fr 1.2fr; }
    }
    .footer__logo { display: flex; align-items: center; gap: 0.8rem; }
    .footer__monogram {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      font-family: var(--font-display);
      font-weight: 700;
      color: #050816;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
    }
    .footer__name { font-family: var(--font-display); font-weight: 700; }
    .footer__role { font-size: 0.82rem; color: var(--text-secondary); }
    .footer__tagline { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; max-width: 24rem; margin: 1.2rem 0; }
    .footer__social { display: flex; gap: 0.7rem; }
    .footer__social a {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 0.75rem;
      color: var(--text-secondary);
      border: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    .footer__social a:hover { color: #050816; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-color: transparent; transform: translateY(-3px); }
    .footer__col { display: flex; flex-direction: column; gap: 0.7rem; }
    .footer__col h4 { font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary); margin: 0 0 0.4rem; }
    .footer__col a, .footer__col span { font-size: 0.92rem; color: var(--text-secondary); transition: color 0.25s ease; width: fit-content; }
    .footer__col a:hover { color: var(--primary); }
    .footer__bottom {
      position: relative;
      border-top: 1px solid var(--border);
      padding: 1.2rem 1.5rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      max-width: 80rem;
      margin: 0 auto;
    }
    .footer__bottom p { margin: 0; font-size: 0.82rem; color: var(--text-muted); }
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
