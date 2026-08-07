import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

interface NavLink {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  template: `
    <header class="nav" [class.nav--scrolled]="scrolled()">
      <div class="nav__inner">
        <a routerLink="/" class="nav__brand" (click)="close()">
          <span class="nav__monogram">SM</span>
          <span class="nav__name">Suresh<span class="text-gradient-static">kumar.dev</span></span>
        </a>

        <nav class="nav__links" aria-label="Primary navigation">
          <a *ngFor="let link of links" [routerLink]="link.path" routerLinkActive="nav__link--active"
             [routerLinkActiveOptions]="{ exact: true }" class="nav__link">{{ link.label }}</a>
        </nav>

        <div class="nav__actions">
          <app-theme-toggle />
          <button class="nav__burger" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-label="Toggle menu">
            <span [class.burger-open]="open()"></span>
            <span [class.burger-open]="open()"></span>
            <span [class.burger-open]="open()"></span>
          </button>
        </div>
      </div>

      <div class="nav__drawer" [class.nav__drawer--open]="open()">
        <a *ngFor="let link of links" [routerLink]="link.path" routerLinkActive="nav__drawer-link--active"
           (click)="close()" class="nav__drawer-link">{{ link.label }}</a>
      </div>
    </header>
  `,
  styles: `
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 950;
      transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
      border-bottom: 1px solid transparent;
    }
    .nav--scrolled {
      background: color-mix(in srgb, var(--bg) 72%, transparent);
      backdrop-filter: blur(18px) saturate(150%);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
      border-bottom-color: var(--border);
      box-shadow: 0 12px 40px -16px var(--shadow-color);
    }
    .nav__inner {
      max-width: 80rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.85rem 1.5rem;
    }
    .nav__brand { display: flex; align-items: center; gap: 0.6rem; }
    .nav__monogram {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      font-family: var(--font-display);
      font-weight: 700;
      color: #050816;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      box-shadow: 0 8px 22px -8px rgba(0, 245, 255, 0.55);
    }
    .nav__name { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; letter-spacing: -0.02em; }
    .nav__links { display: none; gap: 0.25rem; }
    .nav__link {
      position: relative;
      padding: 0.5rem 0.85rem;
      border-radius: 0.6rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: color 0.3s ease, background 0.3s ease;
    }
    .nav__link:hover { color: var(--text-primary); background: color-mix(in srgb, var(--text-primary) 6%, transparent); }
    .nav__link--active { color: var(--primary); }
    .nav__link--active::after {
      content: '';
      position: absolute;
      left: 0.85rem;
      right: 0.85rem;
      bottom: 0.15rem;
      height: 2px;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
    }
    .nav__actions { display: flex; align-items: center; gap: 0.8rem; }
    .nav__burger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 38px;
      height: 38px;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      cursor: pointer;
    }
    .nav__burger span {
      display: block;
      width: 18px;
      height: 2px;
      border-radius: 99px;
      background: var(--text-primary);
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .nav__burger .burger-open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav__burger .burger-open:nth-child(2) { opacity: 0; }
    .nav__burger .burger-open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    .nav__drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(78vw, 300px);
      padding: 5.5rem 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      background: var(--bg-elevated);
      border-left: 1px solid var(--border);
      transform: translateX(100%);
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav__drawer--open { transform: translateX(0); }
    .nav__drawer-link {
      padding: 0.85rem 1rem;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all 0.25s ease;
    }
    .nav__drawer-link:hover, .nav__drawer-link--active { color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, transparent); }
    @media (min-width: 1024px) {
      .nav__links { display: flex; }
      .nav__burger { display: none; }
      .nav__drawer { display: none; }
    }
  `,
})
export class NavbarComponent {
  readonly open = signal(false);
  readonly scrolled = signal(false);

  readonly links: NavLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Education', path: '/education' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 30);
  }

  close(): void {
    this.open.set(false);
  }
}
