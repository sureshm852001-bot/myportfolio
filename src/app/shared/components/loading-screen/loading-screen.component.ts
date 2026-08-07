import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  template: `
    <div class="loader" [class.loader--hidden]="hidden()" [class.loader--overlay]="!firstBoot()">
      <div class="loader__inner">
        <div class="loader__ring">
          <div class="loader__ring-inner"></div>
          <span class="loader__monogram">SM</span>
        </div>
        <p class="loader__name">Sureshkumar M</p>
        <div class="loader__bar"><span class="loader__bar-fill"></span></div>
      </div>
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      pointer-events: none;
    }
    .loader {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg);
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    .loader--hidden {
      opacity: 0;
      visibility: hidden;
    }
    .loader--overlay {
      background: color-mix(in srgb, var(--bg) 78%, transparent);
      backdrop-filter: blur(6px);
    }
    .loader__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.4rem;
    }
    .loader__ring {
      position: relative;
      width: 84px;
      height: 84px;
      display: grid;
      place-items: center;
    }
    .loader__ring::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: var(--primary);
      border-right-color: var(--secondary);
      animation: spin-slow 1.1s linear infinite;
      filter: drop-shadow(0 0 12px color-mix(in srgb, var(--primary) 50%, transparent));
    }
    .loader__ring-inner {
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-bottom-color: var(--accent);
      animation: spin-slow 1.8s linear infinite reverse;
    }
    .loader__monogram {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.4rem;
      background: linear-gradient(120deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .loader__name {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-secondary);
      margin: 0;
    }
    .loader__bar {
      width: 140px;
      height: 3px;
      border-radius: 99px;
      overflow: hidden;
      background: color-mix(in srgb, var(--text-secondary) 18%, transparent);
    }
    .loader__bar-fill {
      display: block;
      height: 100%;
      width: 40%;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      animation: loading-slide 1.2s ease-in-out infinite;
    }
    @keyframes loading-slide {
      0% { transform: translateX(-110%); }
      100% { transform: translateX(360%); }
    }
  `,
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  private readonly loadingService = inject(LoadingService);

  readonly loading = this.loadingService.loading.asReadonly();
  readonly hidden = signal(true);
  readonly firstBoot = signal(true);

  private bootTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.bootTimer = setTimeout(() => {
      this.firstBoot.set(false);
      setTimeout(() => this.hidden.set(!this.loadingService.loading()), 700);
    }, 1100);
  }

  ngOnDestroy(): void {
    if (this.bootTimer) clearTimeout(this.bootTimer);
  }
}
