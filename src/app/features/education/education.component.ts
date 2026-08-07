import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { EducationService } from '../../core/services/education.service';
import { SeoService } from '../../core/services/seo.service';
import type { Education } from '../../core/models/education';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, TimelineItemComponent, SkeletonComponent],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="Academic Journey" title="Education"
        description="The foundations that shaped my engineering mindset." />

      @if (loading()) {
        <div class="education__skeleton">
          @for (item of [1, 2]; track item) {
            <app-skeleton height="8rem" />
          }
        </div>
      } @else {
        <div class="education__timeline">
          <div class="timeline-line"></div>
          @for (edu of education(); track edu.id) {
            <app-timeline-item
              [title]="edu.degree"
              [subtitle]="edu.institution"
              [location]="edu.field ?? ''"
              [period]="getPeriod(edu)"
              [summary]="edu.description ?? ''">
              <div class="edu__meta">
                <span class="edu__score" *ngIf="edu.score">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                  {{ edu.score }}
                </span>
              </div>
              <ul class="edu__list" *ngIf="edu.achievements?.length">
                <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
              </ul>
            </app-timeline-item>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .education__timeline { position: relative; max-width: 52rem; margin: 0 auto; padding-left: 1rem; }
    .education__skeleton { max-width: 52rem; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
    .edu__meta { margin-top: 0.8rem; }
    .edu__score {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--secondary);
      background: color-mix(in srgb, var(--secondary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--secondary) 30%, transparent);
      padding: 0.3rem 0.85rem;
      border-radius: 99px;
    }
    .edu__list { list-style: none; padding: 0; margin: 0.8rem 0 0; display: flex; flex-direction: column; gap: 0.4rem; }
    .edu__list li { position: relative; padding-left: 1.3rem; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; }
    .edu__list li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 7px; height: 7px; border-radius: 2px; background: linear-gradient(135deg, var(--primary), var(--secondary)); }
  `,
})
export class EducationComponent implements OnInit {
  readonly loading = signal(true);
  readonly education = signal<Education[]>([]);

  private readonly educationService = inject(EducationService);
  private readonly seo = inject(SeoService);

  getPeriod(edu: Education): string {
    const start = this.formatDate(edu.startDate);
    const end = edu.endDate ? this.formatDate(edu.endDate) : 'Present';
    return `${start} — ${end}`;
  }

  private formatDate(value: string): string {
    return new Date(value).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  }

  ngOnInit(): void {
    this.seo.update('Education', 'Academic background and qualifications.');
    this.educationService.getAll({ sort: 'sortOrder,asc' }).subscribe({
      next: (res) => this.education.set(res.data),
      complete: () => this.loading.set(false),
    });
  }
}
