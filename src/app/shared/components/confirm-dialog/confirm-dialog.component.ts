import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

/**
 * Reusable confirmation dialog used across the admin panel.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="confirm">
      <div class="confirm__icon" [class.confirm__icon--danger]="data.danger">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 9v4M12 17h.01"></path>
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path>
        </svg>
      </div>
      <h2 class="confirm__title">{{ data.title }}</h2>
      <p class="confirm__message">{{ data.message }}</p>
      <div class="confirm__actions">
        <button class="btn-ghost" [mat-dialog-close]="false">{{ data.cancelLabel || 'Cancel' }}</button>
        <button class="btn-gradient" [class.btn-gradient--danger]="data.danger" [mat-dialog-close]="true">
          {{ data.confirmLabel || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: `
    .confirm { padding: 1.6rem; text-align: center; }
    .confirm__icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--warning);
      background: color-mix(in srgb, var(--warning) 12%, transparent);
    }
    .confirm__icon--danger { color: var(--danger); background: color-mix(in srgb, var(--danger) 12%, transparent); }
    .confirm__title { font-family: var(--font-display); font-size: 1.25rem; margin: 0 0 0.5rem; }
    .confirm__message { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0 0 1.5rem; }
    .confirm__actions { display: flex; justify-content: center; gap: 0.8rem; }
    .btn-gradient--danger { background: linear-gradient(120deg, var(--danger), #f97316); }
    .btn-gradient--danger:hover { box-shadow: 0 12px 32px -8px rgba(239, 68, 68, 0.5); }
  `,
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
