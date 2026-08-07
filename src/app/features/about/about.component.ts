import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ExperienceService } from '../../core/services/experience.service';
import { SeoService } from '../../core/services/seo.service';
import type { Experience } from '../../core/models/experience';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionHeadingComponent,
    GlassCardComponent,
    SkeletonComponent,
    CounterDirective,
    RevealDirective,
  ],
  template: `
    <div class="page-shell section-container">
      <app-section-heading label="Who I am" title="About Me"
        description="A problem-solver at heart, I turn complex business requirements into clean, reliable software." />

      <div class="about__grid">
        <div class="about__story" appReveal>
          <h3 class="about__eyebrow">Professional Summary</h3>
          <p class="about__text">
            I'm a <strong>Java Full Stack Developer</strong> with 3+ years of experience building
            enterprise-grade web applications. My expertise spans the entire development lifecycle —
            designing <strong>REST APIs</strong> and microservices with Spring Boot, implementing
            <strong>JWT-secured authentication</strong>, modeling relational data with
            <strong>Hibernate &amp; MySQL</strong>, and shipping polished interfaces with
            <strong>Angular</strong>.
          </p>
          <p class="about__text">
            I believe great software is born at the intersection of <strong>clean architecture</strong>,
            <strong>solid engineering discipline</strong> and <strong>obsessive attention to detail</strong>.
            From distributor management systems to ETL pipelines and responsive, animated frontends —
            I enjoy owning features end to end and raising the quality bar with every commit.
          </p>
          <div class="about__toggles">
            <a routerLink="/contact" class="btn-gradient">Let's Work Together</a>
            <a routerLink="/projects" class="btn-ghost">See My Work</a>
          </div>
        </div>

        <div class="about__facts">
          <div class="about__facts-grid">
            <div class="fact" appReveal [delay]="80">
              <span class="fact__icon">&#9993;</span>
              <div>
                <div class="fact__label">Email</div>
                <div class="fact__value">sureshm.852001@gmail.com</div>
              </div>
            </div>
            <div class="fact" appReveal [delay]="140">
              <span class="fact__icon">&#9742;</span>
              <div>
                <div class="fact__label">Phone</div>
                <div class="fact__value">+91 97862 71736</div>
              </div>
            </div>
            <div class="fact" appReveal [delay]="200">
              <span class="fact__icon">&#9881;</span>
              <div>
                <div class="fact__label">Focus</div>
                <div class="fact__value">Java · Spring Boot · Angular</div>
              </div>
            </div>
            <div class="fact" appReveal [delay]="260">
              <span class="fact__icon">&#128205;</span>
              <div>
                <div class="fact__label">Based In</div>
                <div class="fact__value">Chennai, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ HIGHLIGHTS ============ -->
      <div class="about__highlights">
        @if (experienceLoading()) {
          <div class="highlights__grid">
            @for (item of [1, 2]; track item) {
              <app-glass-card>
                <app-skeleton height="1.2rem" width="60%" />
                <app-skeleton height="0.9rem" />
                <app-skeleton height="0.9rem" />
              </app-glass-card>
            }
          </div>
        } @else {
          <div class="highlights__grid">
            @for (exp of experiences(); track exp.id) {
              <app-glass-card [tilt]="true">
                <div class="highlight__tag">Experience Highlight</div>
                <h3 class="highlight__role">{{ exp.role }}</h3>
                <div class="highlight__company">{{ exp.company }} <span class="highlight__sep">&middot;</span> {{ getPeriod(exp) }}</div>
                <p class="highlight__text">{{ exp.summary }}</p>
                <div class="highlight__tech">
                  <span class="tech-chip" *ngFor="let tech of exp.technologies.slice(0, 6)">{{ tech }}</span>
                </div>
              </app-glass-card>
            }
          </div>
        }
      </div>

      <!-- ============ NUMBERS ============ -->
      <div class="about__numbers">
        <div class="number" appReveal>
          <div class="number__value"><span [appCounter]="3" [suffix]="'+'" [duration]="1500">0</span></div>
          <div class="number__label">Years of Experience</div>
        </div>
        <div class="number" appReveal [delay]="80">
          <div class="number__value"><span [appCounter]="10" [suffix]="'+'" [duration]="1500">0</span></div>
          <div class="number__label">Projects Delivered</div>
        </div>
        <div class="number" appReveal [delay]="160">
          <div class="number__value"><span [appCounter]="25" [suffix]="'+'" [duration]="1500">0</span></div>
          <div class="number__label">Technologies Mastered</div>
        </div>
        <div class="number" appReveal [delay]="240">
          <div class="number__value"><span [appCounter]="30" [suffix]="'%'" [duration]="1500">0</span></div>
          <div class="number__label">API Performance Boost</div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .about__grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; }
    @media (min-width: 1024px) { .about__grid { grid-template-columns: 1.35fr 1fr; } }
    .about__eyebrow { font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--primary); margin: 0 0 1rem; }
    .about__text { color: var(--text-secondary); font-size: 1rem; line-height: 1.85; margin: 0 0 1rem; }
    .about__text strong { color: var(--text-primary); }
    .about__toggles { display: flex; gap: 0.9rem; flex-wrap: wrap; margin-top: 1.6rem; }

    .about__facts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .fact {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 1.1rem;
      border-radius: 1rem;
      background: var(--card-soft);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .fact:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--primary) 40%, var(--border)); }
    .fact__icon {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      font-size: 1.15rem;
      color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
      flex-shrink: 0;
    }
    .fact__label { font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.15rem; }
    .fact__value { font-size: 0.88rem; font-weight: 600; word-break: break-word; }

    .about__highlights { margin-top: 4.5rem; }
    .highlights__grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
    @media (min-width: 900px) { .highlights__grid { grid-template-columns: repeat(2, 1fr); } }
    .highlight__tag { display: inline-block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--secondary); margin-bottom: 0.7rem; }
    .highlight__role { font-size: 1.15rem; font-weight: 700; margin: 0 0 0.3rem; }
    .highlight__company { color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.9rem; }
    .highlight__text { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7; margin: 0 0 1rem; }
    .highlight__tech { display: flex; flex-wrap: wrap; gap: 0.45rem; }
    .tech-chip { font-family: var(--font-mono); font-size: 0.72rem; padding: 0.25rem 0.65rem; border-radius: 0.5rem; color: var(--text-primary); background: color-mix(in srgb, var(--text-secondary) 12%, transparent); }

    .about__numbers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 4.5rem; text-align: center; }
    @media (min-width: 900px) { .about__numbers { grid-template-columns: repeat(4, 1fr); } }
    .number { padding: 1.6rem 1rem; border-radius: 1.25rem; background: var(--card); border: 1px solid var(--border); transition: transform 0.35s ease, border-color 0.35s ease; }
    .number:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--primary) 40%, var(--border)); }
    .number__value { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.6rem); font-weight: 700; background: linear-gradient(120deg, var(--primary), var(--secondary)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .number__label { color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.4rem; }
  `,
})
export class AboutComponent implements OnInit {
  readonly experienceLoading = signal(true);
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
    this.seo.update('About', 'Professional summary, experience highlights and quick facts.');
    this.experienceService.getAll({ sort: 'sortOrder,asc' }).subscribe({
      next: (res) => this.experiences.set(res.data.slice(0, 2)),
      complete: () => this.experienceLoading.set(false),
    });
  }
}
