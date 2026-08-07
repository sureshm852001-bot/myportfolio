import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import type { Project } from '../../../core/models/project';

export interface ProjectModalData {
  project: Project;
}

/**
 * Detailed project modal: features, architecture, technology stack and links.
 */
@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" role="dialog" aria-modal="true" [attr.aria-label]="project.title">
      <div class="modal__hero">
        <img [src]="project.imageUrl || 'assets/images/project-placeholder.svg'" [alt]="project.title" />
        <button class="modal__close" (click)="close()" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="modal__body">
        <div class="modal__tags">
          <span class="chip" *ngFor="let tag of project.tags">{{ tag }}</span>
        </div>
        <h2 class="modal__title">{{ project.title }}</h2>
        <p class="modal__subtitle" *ngIf="project.subtitle">{{ project.subtitle }}</p>
        <p class="modal__desc">{{ project.description }}</p>

        <div class="modal__meta" *ngIf="project.startDate || project.endDate">
          <span class="modal__period">{{ (project.startDate | date: 'MMM yyyy') || '—' }} &rarr; {{ (project.endDate | date: 'MMM yyyy') || 'Present' }}</span>
          <span class="modal__status">{{ project.status.replace('_', ' ') }}</span>
        </div>

        <section class="modal__section" *ngIf="project.features?.length">
          <h3>Key Features</h3>
          <ul class="modal__list">
            <li *ngFor="let feature of project.features">{{ feature }}</li>
          </ul>
        </section>

        <section class="modal__section" *ngIf="project.architecture">
          <h3>Architecture</h3>
          <p class="modal__arch">{{ project.architecture }}</p>
        </section>

        <section class="modal__section" *ngIf="project.technologies?.length">
          <h3>Technology Stack</h3>
          <div class="modal__tech">
            <span class="tech" *ngFor="let tech of project.technologies">{{ tech }}</span>
          </div>
        </section>

        <div class="modal__actions">
          <a *ngIf="project.githubUrl" class="btn-gradient" [href]="project.githubUrl" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>
            GitHub
          </a>
          <a *ngIf="project.liveUrl" class="btn-ghost" [href]="project.liveUrl" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .modal { overflow-y: auto; max-height: 88vh; }
    .modal__hero { position: relative; height: 230px; overflow: hidden; border-radius: 1.25rem 1.25rem 0 0; }
    .modal__hero img { width: 100%; height: 100%; object-fit: cover; }
    .modal__close {
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--text-primary);
      background: color-mix(in srgb, var(--bg) 60%, transparent);
      border: 1px solid var(--border);
      backdrop-filter: blur(8px);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .modal__close:hover { background: var(--danger); color: #fff; border-color: transparent; }
    .modal__body { padding: 1.6rem 1.8rem 2rem; }
    .modal__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.9rem; }
    .modal__title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; margin: 0 0 0.25rem; }
    .modal__subtitle { color: var(--primary); font-size: 0.95rem; margin: 0 0 0.7rem; }
    .modal__desc { color: var(--text-secondary); line-height: 1.7; margin: 0 0 1rem; }
    .modal__meta { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem; }
    .modal__period { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-secondary); }
    .modal__status { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--success); background: color-mix(in srgb, var(--success) 12%, transparent); padding: 0.25rem 0.7rem; border-radius: 99px; }
    .modal__section { margin-bottom: 1.3rem; }
    .modal__section h3 { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary); margin: 0 0 0.6rem; }
    .modal__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
    .modal__list li { position: relative; padding-left: 1.4rem; color: var(--text-primary); font-size: 0.92rem; line-height: 1.6; }
    .modal__list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
    }
    .modal__arch { color: var(--text-secondary); line-height: 1.7; font-size: 0.92rem; margin: 0; }
    .modal__tech { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-primary); background: var(--card-soft); border: 1px solid var(--border); padding: 0.35rem 0.8rem; border-radius: 0.6rem; }
    .modal__actions { display: flex; gap: 0.8rem; margin-top: 1.6rem; flex-wrap: wrap; }
  `,
})
export class ProjectModalComponent {
  readonly project: Project;

  private readonly dialogRef = inject(MatDialogRef<ProjectModalComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: ProjectModalData) {
    this.project = data.project;
  }

  close(): void {
    this.dialogRef.close();
  }
}
