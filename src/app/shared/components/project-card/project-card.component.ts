import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TiltDirective } from '../../directives/tilt.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import type { Project } from '../../../core/models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

/**
 * Premium project card with image, tags, actions and a details modal.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TiltDirective, RevealDirective, TruncatePipe],
  template: `
    <article class="card" appReveal>
      <div class="card__visual" [appTilt]="6">
        <img [src]="project.imageUrl || 'assets/images/project-placeholder.svg'"
             [alt]="project.title" loading="lazy" width="640" height="360" />
        <div class="card__overlay">
          <div class="card__actions">
            <a *ngIf="project.githubUrl" class="round-btn" [href]="project.githubUrl" target="_blank" rel="noopener" aria-label="GitHub repository">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>
            </a>
            <a *ngIf="project.liveUrl" class="round-btn" [href]="project.liveUrl" target="_blank" rel="noopener" aria-label="Live demo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            </a>
          </div>
        </div>
        <span *ngIf="project.featured" class="card__badge">Featured</span>
      </div>

      <div class="card__body">
        <div class="card__tags">
          <span class="chip" *ngFor="let tag of project.tags.slice(0, 3)">{{ tag }}</span>
        </div>
        <h3 class="card__title">{{ project.title }}</h3>
        <p class="card__desc">{{ project.description | truncate:130 }}</p>

        <div class="card__footer">
          <button class="card__details" (click)="openDetails()">
            Details
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `,
  styles: `
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: 1.25rem;
      overflow: hidden;
      background: var(--card);
      border: 1px solid var(--border);
      box-shadow: 0 14px 44px -18px var(--shadow-color);
      transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .card:hover {
      transform: translateY(-8px);
      border-color: color-mix(in srgb, var(--primary) 40%, var(--border));
      box-shadow: 0 30px 70px -24px var(--shadow-color), 0 0 40px -16px color-mix(in srgb, var(--primary) 45%, transparent);
    }
    .card__visual {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      will-change: transform;
    }
    .card__visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card:hover .card__visual img { transform: scale(1.08); }
    .card__overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 1rem;
      background: linear-gradient(0deg, color-mix(in srgb, var(--bg) 55%, transparent), transparent 55%);
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .card:hover .card__overlay { opacity: 1; }
    .card__actions { display: flex; gap: 0.55rem; }
    .round-btn {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--text-primary);
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }
    .round-btn:hover { color: var(--bg); background: linear-gradient(135deg, var(--primary), var(--secondary)); border-color: transparent; transform: translateY(-2px); }
    .card__badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.3rem 0.8rem;
      border-radius: 99px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #050816;
      background: linear-gradient(120deg, var(--primary), var(--accent));
      box-shadow: 0 6px 18px -6px rgba(0, 245, 255, 0.6);
    }
    .card__body { display: flex; flex-direction: column; gap: 0.85rem; padding: 1.4rem 1.5rem 1.6rem; flex: 1; }
    .card__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .card__title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; margin: 0; }
    .card__desc { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65; margin: 0; }
    .card__footer { margin-top: auto; padding-top: 0.6rem; }
    .card__details {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1.1rem;
      border-radius: 99px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .card__details:hover { background: color-mix(in srgb, var(--primary) 18%, transparent); transform: translateY(-2px); }
  `,
})
export class ProjectCardComponent {
  @Input() project!: Project;
  private readonly dialog = inject(MatDialog);

  openDetails(): void {
    this.dialog.open(ProjectModalComponent, {
      data: { project: this.project },
      width: 'min(92vw, 780px)',
      maxHeight: '88vh',
      panelClass: 'project-dialog',
      autoFocus: false,
    });
  }
}
