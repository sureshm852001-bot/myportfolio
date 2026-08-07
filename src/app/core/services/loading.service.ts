import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  readonly loading = signal(false);

  private pending = 0;

  show(): void {
    this.pending++;
    this.loading.set(true);
  }

  hide(): void {
    this.pending = Math.max(0, this.pending - 1);
    if (this.pending === 0) this.loading.set(false);
  }

  reset(): void {
    this.pending = 0;
    this.loading.set(false);
  }
}
