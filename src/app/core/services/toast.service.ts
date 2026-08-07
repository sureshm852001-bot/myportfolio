import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  private counter = 0;
  private readonly defaultDuration = 4200;

  private push(type: ToastMessage['type'], message: string, title?: string, duration?: number): void {
    const id = ++this.counter;
    this.toasts.update((list) => [...list, { id, type, message, title }]);
    setTimeout(() => this.dismiss(id), duration ?? this.defaultDuration);
  }

  success(message: string, title?: string): void {
    this.push('success', message, title);
  }

  error(message: string, title?: string): void {
    this.push('error', message, title ?? 'Something went wrong', 6000);
  }

  info(message: string, title?: string): void {
    this.push('info', message, title);
  }

  warning(message: string, title?: string): void {
    this.push('warning', message, title, 5200);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }
}
