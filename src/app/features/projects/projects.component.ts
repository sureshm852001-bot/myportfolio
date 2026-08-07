import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProjectService } from '../../core/services/project.service';
import { SeoService } from '../../core/services/seo.service';
import type { Project } from '../../core/models/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    ProjectCardComponent,
    SkeletonComponent,
    RippleDirective,
    RevealDirective,
  ],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="My Work" title="Projects"
        description="End-to-end products engineered with clean architecture, resilient APIs and polished UIs." />

      <div class="projects__filters" appReveal>
        <button class="filter-btn" [class.filter-btn--active]="activeFilter() === 'ALL'"
                (click)="activeFilter.set('ALL')" appRipple>All <span>{{ projects().length }}</span></button>
        @for (tag of allTags(); track tag) {
          <button class="filter-btn" [class.filter-btn--active]="activeFilter() === tag"
                  (click)="activeFilter.set(tag)" appRipple>{{ tag }} <span>{{ countFor(tag) }}</span></button>
        }
      </div>

      @if (loading()) {
        <div class="projects__grid">
          @for (item of [1, 2, 3, 4, 5, 6]; track item) {
            <div class="projects__skeleton">
              <app-skeleton height="210px" radius="1.25rem 1.25rem 0 0" />
              <div class="projects__skeleton-body">
                <app-skeleton width="60%" height="1.2rem" />
                <app-skeleton height="0.9rem" />
                <app-skeleton height="0.9rem" width="75%" />
              </div>
            </div>
          }
        </div>
      } @else if (filtered().length === 0) {
        <div class="projects__empty">
          <p>No projects match this filter yet.</p>
        </div>
      } @else {
        <div class="projects__grid">
          @for (project of filtered(); track project.id) {
            <app-project-card [project]="project" />
          }
        </div>
      }
    </div>
  `,
  styles: `
    .projects__filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-bottom: 3rem; }
    .filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1.1rem;
      border-radius: 99px;
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--card);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .filter-btn:hover { color: var(--primary); border-color: color-mix(in srgb, var(--primary) 45%, var(--border)); transform: translateY(-2px); }
    .filter-btn--active { color: #050816; background: linear-gradient(120deg, var(--primary), var(--secondary)); border-color: transparent; box-shadow: 0 10px 26px -10px rgba(0, 245, 255, 0.5); }
    .filter-btn span { font-family: var(--font-mono); font-size: 0.72rem; opacity: 0.85; }

    .projects__grid { display: grid; grid-template-columns: 1fr; gap: 1.8rem; }
    @media (min-width: 768px) { .projects__grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1100px) { .projects__grid { grid-template-columns: repeat(3, 1fr); } }
    .projects__skeleton { border-radius: 1.25rem; overflow: hidden; background: var(--card); border: 1px solid var(--border); }
    .projects__skeleton-body { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.8rem; }
    .projects__empty { text-align: center; padding: 4rem 1rem; color: var(--text-secondary); font-size: 1.05rem; }
  `,
})
export class ProjectsComponent implements OnInit {
  readonly loading = signal(true);
  readonly projects = signal<Project[]>([]);
  readonly activeFilter = signal<string>('ALL');

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.projects().forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  });

  readonly filtered = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'ALL') return this.projects();
    return this.projects().filter((project) => project.tags.includes(filter));
  });

  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);

  countFor(tag: string): number {
    return this.projects().filter((project) => project.tags.includes(tag)).length;
  }

  ngOnInit(): void {
    this.seo.update('Projects', 'Selected projects with architecture, features and live demos.');
    this.projectService.getAll({ sort: 'sortOrder,asc' }).subscribe({
      next: (res) => this.projects.set(res.data),
      complete: () => this.loading.set(false),
    });
  }
}
