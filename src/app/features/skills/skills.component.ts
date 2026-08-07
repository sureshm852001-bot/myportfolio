import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { SkillBarComponent } from '../../shared/components/skill-bar/skill-bar.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { SkillService } from '../../core/services/skill.service';
import { SeoService } from '../../core/services/seo.service';
import type { Skill, SkillCategory } from '../../core/models/skill';

type CategoryKey = 'ALL' | SkillCategory;

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    GlassCardComponent,
    SkillBarComponent,
    SkeletonComponent,
    RevealDirective,
    RippleDirective,
  ],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="Tech Arsenal" title="Skills &amp; Expertise"
        description="A curated stack I use to design, build and ship production-grade software." />

      <div class="skills__filters" appReveal>
        @for (filter of filters; track filter.key) {
          <button class="filter-btn" [class.filter-btn--active]="activeFilter() === filter.key"
                  (click)="activeFilter.set(filter.key)" appRipple>
            {{ filter.label }}
            <span class="filter-btn__count">{{ countFor(filter.key) }}</span>
          </button>
        }
      </div>

      @if (loading()) {
        <div class="skills__skeleton">
          @for (item of [1, 2, 3, 4]; track item) {
            <app-glass-card>
              <app-skeleton width="40%" height="1.2rem" />
              <app-skeleton height="0.6rem" />
              <app-skeleton height="0.6rem" />
              <app-skeleton height="0.6rem" />
              <app-skeleton height="0.6rem" />
            </app-glass-card>
          }
        </div>
      } @else {
        <div class="skills__grid">
          @for (group of visibleGroups(); track group.category) {
            <app-glass-card>
              <div class="group">
                <div class="group__head">
                  <span class="group__icon">{{ group.icon }}</span>
                  <div>
                    <h3 class="group__title">{{ group.title }}</h3>
                    <p class="group__subtitle">{{ group.subtitle }}</p>
                  </div>
                </div>
                <div class="group__bars">
                  @for (skill of group.skills; track skill.id) {
                    <app-skill-bar [name]="skill.name" [level]="skill.level" />
                  }
                </div>
              </div>
            </app-glass-card>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .skills__filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.7rem; margin-bottom: 3rem; }
    .filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      border-radius: 99px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--card);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .filter-btn:hover { color: var(--primary); border-color: color-mix(in srgb, var(--primary) 45%, var(--border)); transform: translateY(-2px); }
    .filter-btn--active { color: #050816; background: linear-gradient(120deg, var(--primary), var(--secondary)); border-color: transparent; box-shadow: 0 10px 26px -10px rgba(0, 245, 255, 0.5); }
    .filter-btn__count { font-size: 0.72rem; font-family: var(--font-mono); opacity: 0.85; }

    .skills__skeleton { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
    @media (min-width: 900px) { .skills__skeleton { grid-template-columns: repeat(2, 1fr); } }

    .skills__grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
    @media (min-width: 900px) { .skills__grid { grid-template-columns: repeat(2, 1fr); } }

    .group__head { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.6rem; }
    .group__icon {
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      font-size: 1.5rem;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
      flex-shrink: 0;
    }
    .group__title { font-size: 1.2rem; font-weight: 700; margin: 0; }
    .group__subtitle { color: var(--text-secondary); font-size: 0.82rem; margin: 0.15rem 0 0; }
    .group__bars { display: flex; flex-direction: column; }
  `,
})
export class SkillsComponent implements OnInit {
  readonly loading = signal(true);
  readonly skills = signal<Skill[]>([]);
  readonly activeFilter = signal<CategoryKey>('ALL');

  readonly filters: { key: CategoryKey; label: string }[] = [
    { key: 'ALL', label: 'All' },
    { key: 'BACKEND', label: 'Backend' },
    { key: 'FRONTEND', label: 'Frontend' },
    { key: 'DATABASE', label: 'Database' },
    { key: 'TOOLS', label: 'Tools' },
  ];

  readonly categoryMeta: Record<SkillCategory, { title: string; subtitle: string; icon: string }> = {
    BACKEND: { title: 'Backend Engineering', subtitle: 'APIs, security & business logic', icon: '⚙' },
    FRONTEND: { title: 'Frontend Development', subtitle: 'Interfaces people love to use', icon: '🖨' },
    DATABASE: { title: 'Database Design', subtitle: 'Modeling, optimization & procedures', icon: '📁' },
    TOOLS: { title: 'Tools & Platforms', subtitle: 'Shipping & collaboration workflow', icon: '🛠' },
    OTHER: { title: 'Other Expertise', subtitle: 'Additional capabilities', icon: '✨' },
  };

  readonly visibleGroups = computed(() => {
    const filter = this.activeFilter();
    const all = this.skills();
    const categories: SkillCategory[] =
      filter === 'ALL' ? (['BACKEND', 'FRONTEND', 'DATABASE', 'TOOLS'] as SkillCategory[]) : [filter];

    return categories
      .filter((category) => all.some((skill) => skill.category === category))
      .map((category) => ({
        category,
        ...this.categoryMeta[category],
        skills: all.filter((skill) => skill.category === category).sort((a, b) => b.level - a.level),
      }));
  });

  private readonly skillService = inject(SkillService);
  private readonly seo = inject(SeoService);

  countFor(key: CategoryKey): number {
    if (key === 'ALL') return this.skills().length;
    return this.skills().filter((skill) => skill.category === key).length;
  }

  ngOnInit(): void {
    this.seo.update('Skills', 'Backend, frontend, database and tooling skills with proficiency levels.');
    this.skillService.getAll().subscribe({
      next: (res) => this.skills.set(res.data),
      complete: () => this.loading.set(false),
    });
  }
}
