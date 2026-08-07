import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ExperienceService } from '../../core/services/experience.service';
import { SeoService } from '../../core/services/seo.service';
import type { Experience } from '../../core/models/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, TimelineItemComponent, SkeletonComponent],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="Career Path" title="Work Experience"
        description="Roles where I've shipped products, owned features and grown as an engineer." />

      @if (loading()) {
        <div class="experience__skeleton">
          @for (item of [1, 2, 3]; track item) {
            <div class="experience__skeleton-item">
              <app-skeleton width="34px" height="34px" radius="50%" />
              <app-skeleton height="9rem" />
            </div>
          }
        </div>
      } @else {
        <div class="experience__timeline">
          <div class="timeline-line"></div>
          @for (exp of experiences(); track exp.id) {
            <app-timeline-item
              [title]="exp.role"
              [subtitle]="exp.company"
              [location]="exp.location ?? ''"
              [period]="getPeriod(exp)"
              [summary]="exp.summary">
              <div class="exp__block">
                <div class="exp__label">Responsibilities</div>
                <ul class="exp__list">
                  <li *ngFor="let responsibility of exp.responsibilities">{{ responsibility }}</li>
                </ul>
              </div>
              <div class="exp__block" *ngIf="exp.technologies.length">
                <div class="exp__label">Technology Stack</div>
                <div class="exp__tech">
                  <span class="tech-chip" *ngFor="let tech of exp.technologies">{{ tech }}</span>
                </div>
              </div>
              <div class="exp__block" *ngIf="exp.achievements.length">
                <div class="exp__label">Achievements</div>
                <ul class="exp__list exp__list--gold">
                  <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
                </ul>
              </div>
            </app-timeline-item>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .experience__timeline { position: relative; max-width: 52rem; margin: 0 auto; padding-left: 1rem; }
    .experience__skeleton { max-width: 52rem; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
    .experience__skeleton-item { display: flex; gap: 1.5rem; padding-left: 1rem; align-items: flex-start; }

    .exp__block { margin-top: 1rem; }
    .exp__label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
    .exp__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem; }
    .exp__list li { position: relative; padding-left: 1.3rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
    .exp__list li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 7px; height: 7px; border-radius: 2px; background: linear-gradient(135deg, var(--primary), var(--secondary)); }
    .exp__list--gold li::before { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
    .exp__tech { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech-chip { font-family: var(--font-mono); font-size: 0.75rem; padding: 0.3rem 0.7rem; border-radius: 0.55rem; color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, transparent); border: 1px solid color-mix(in srgb, var(--primary) 22%, transparent); }
  `,
})
export class ExperienceComponent implements OnInit {
  readonly loading = signal(true);
  readonly experiences = signal<Experience[]>([]);

  private readonly experienceService = inject(ExperienceService);
  private readonly seo = inject(SeoService);

  getPeriod(exp: Experience): string {
    const start = this.formatDate(exp.startDate);
    const end = exp.current ? 'Present' : this.formatDate(exp.endDate ?? '');
    return `${start} — ${end}`;
  }

  private formatDate(value?: string): string {
    if (!value) return '—';
    return new Date(value).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  }

  ngOnInit(): void {
    this.seo.update('Experience', 'Professional work experience timeline.');
    this.experienceService.getAll({ sort: 'sortOrder,asc' }).subscribe({
      next: (res) => this.experiences.set(res.data),
      complete: () => this.loading.set(false),
    });
  }
}
