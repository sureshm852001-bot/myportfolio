import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Global toast notification host.
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-host" aria-live="polite">
      <div *ngFor="let toast of toastService.toasts()" class="toast" [class]="'toast-' + toast.type"
           (click)="toastService.dismiss(toast.id)">
        <span class="toast__icon">
          <ng-container [ngSwitch]="toast.type">
            <svg *ngSwitchCase="'success'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            <svg *ngSwitchCase="'error'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
            <svg *ngSwitchCase="'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
            <svg *ngSwitchCase="'warning'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4M12 17h.01"></path></svg>
          </ng-container>
        </span>
        <div class="toast__body">
          <strong *ngIf="toast.title">{{ toast.title }}</strong>
          <span>{{ toast.message }}</span>
        </div>
        <span class="toast__close">&times;</span>
      </div>
    </div>
  `,
  styles: `
    .toast-host {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 12000;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      max-width: min(92vw, 360px);
    }
    .toast { cursor: pointer; }
    .toast__icon { display: grid; place-items: center; flex-shrink: 0; }
    .toast__body { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
    .toast__body strong { font-size: 0.82rem; letter-spacing: 0.02em; }
    .toast__close { margin-left: auto; opacity: 0.6; font-size: 1.1rem; }
  `,
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
