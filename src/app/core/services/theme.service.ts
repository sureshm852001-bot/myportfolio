import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('dark');
  private readonly storageKey = 'theme';

  constructor(private readonly storage: StorageService) {
    const stored = this.storage.get<Theme>(this.storageKey);
    const preferred: Theme =
      stored ??
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    this.apply(preferred);
  }

  toggle(): void {
    this.apply(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.apply(theme);
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    this.storage.set(this.storageKey, theme);
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }
}
