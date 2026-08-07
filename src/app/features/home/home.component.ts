import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TypingTextComponent } from '../../shared/components/typing-text/typing-text.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProjectService } from '../../core/services/project.service';
import { ResumeService } from '../../core/services/resume.service';
import { SeoService } from '../../core/services/seo.service';
import type { Project } from '../../core/models/project';
import type { Resume } from '../../core/models/resume';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TypingTextComponent,
    SectionHeadingComponent,
    ProjectCardComponent,
    SkeletonComponent,
    CounterDirective,
    RevealDirective,
  ],
  template: `
    <div class="page-shell">
      <!-- ===================== HERO ===================== -->
      <section class="hero">
        <div class="hero__bg">
          <div class="hero__blob hero__blob--1"></div>
          <div class="hero__blob hero__blob--2"></div>
          <span class="float-icon" style="top:18%;left:12%">&#123; &nbsp;Java&nbsp; &#125;</span>
          <span class="float-icon" style="top:64%;left:8%;animation-delay:1.4s">&#60;Angular/&#62;</span>
          <span class="float-icon" style="top:24%;right:12%;animation-delay:2.2s">Spring</span>
          <span class="float-icon" style="top:70%;right:9%;animation-delay:0.8s">SQL</span>
        </div>

        <div class="hero__content">
          <div class="hero__left">
            <div class="hero__greeting" appReveal>
              <span class="hero__greet-line"></span>
              Hi, my name is
            </div>

            <h1 class="hero__name" appReveal [delay]="80">
              Sureshkumar M
            </h1>

            <div class="hero__title" appReveal [delay]="160">
              <app-typing-text [phrases]="typingPhrases" />
            </div>

            <p class="hero__desc" appReveal [delay]="240">
              Java Full Stack Developer with 3+ years of experience crafting enterprise applications —
              from secure REST APIs and microservices with Spring Boot to responsive, elegant interfaces with Angular.
            </p>

            <div class="hero__cta" appReveal [delay]="320">
              <button class="btn-gradient" (click)="downloadResume()" [disabled]="resumeDownloading()">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5M12 15V3"></path></svg>
                {{ resumeDownloading() ? 'Preparing…' : 'Download Resume' }}
              </button>
              <a class="btn-ghost" routerLink="/projects">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                View Projects
              </a>
              <a class="btn-ghost" routerLink="/contact">Contact Me</a>
            </div>

            <div class="hero__stats" appReveal [delay]="420">
              <div class="stat">
                <div class="stat__value"><span [appCounter]="3" [suffix]="'+'" [duration]="1400">0</span></div>
                <div class="stat__label">Years Experience</div>
              </div>
              <div class="stat__divider"></div>
              <div class="stat">
                <div class="stat__value"><span [appCounter]="5" [suffix]="'+'" [duration]="1400">0</span></div>
                <div class="stat__label">Project Worked</div>
              </div>
              <div class="stat__divider"></div>
              <div class="stat">
                <div class="stat__value"><span [appCounter]="10" [suffix]="'+'" [duration]="1400">0</span></div>
                <div class="stat__label">Technologies</div>
              </div>
              <div class="stat__divider"></div>
              <div class="stat">
                <div class="stat__value"><span [appCounter]="30" [suffix]="'%'" [duration]="1400">0</span></div>
                <div class="stat__label">API Performance Gain</div>
              </div>
            </div>
          </div>

          <div class="hero__right" appReveal [delay]="300">
            <div class="profile neon-ring">
              <div class="profile__orbit">
                <span class="profile__badge profile__badge--1">&#9889;</span>
                <span class="profile__badge profile__badge--2">&#127919;</span>
                <span class="profile__badge profile__badge--3">&#128225;</span>
                <span class="profile__badge profile__badge--4">&#128274;</span>
              </div>
              <img src="assets/images/avatar.png" alt="Sureshkumar M avatar" width="340" height="340" />
              <div class="profile__ring-spin"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================== FEATURED PROJECTS ===================== -->
      <section class="section-container" id="featured">
        <app-section-heading label="Portfolio" title="Featured Projects"
          description="A selection of the products I've engineered end-to-end — from database to pixel." />

        @if (loading()) {
          <div class="grid-featured">
            @for (item of [1, 2, 3]; track item) {
              <div class="featured-skeleton">
                <app-skeleton height="200px" radius="1.25rem 1.25rem 0 0" />
                <div class="featured-skeleton__body">
                  <app-skeleton width="70%" height="1.3rem" />
                  <app-skeleton height="0.9rem" />
                  <app-skeleton height="0.9rem" width="85%" />
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="grid-featured">
            @for (project of featuredProjects(); track project.id) {
              <app-project-card [project]="project" />
            }
          </div>
        }

        <div class="hero__more" appReveal>
          <a routerLink="/projects" class="btn-ghost">
            View all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: `
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 7rem 1.5rem 4rem; }
    .hero__bg { position: absolute; inset: 0; pointer-events: none; }
    .hero__blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; }
    .hero__blob--1 { width: 480px; height: 480px; top: -120px; right: -80px; background: color-mix(in srgb, var(--secondary) 45%, transparent); animation: blob-move 16s ease-in-out infinite; }
    .hero__blob--2 { width: 420px; height: 420px; bottom: -140px; left: -100px; background: color-mix(in srgb, var(--primary) 30%, transparent); animation: blob-move 20s ease-in-out infinite reverse; }

    .hero__content { position: relative; max-width: 80rem; width: 100%; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
    @media (min-width: 1024px) { .hero__content { grid-template-columns: 1.2fr 0.8fr; } }

    .hero__greeting { display: flex; align-items: center; gap: 0.8rem; font-family: var(--font-mono); font-size: 0.95rem; color: var(--primary); }
    .hero__greet-line { width: 2.4rem; height: 2px; background: linear-gradient(90deg, var(--primary), transparent); }
    .hero__name { font-family: var(--font-display); font-size: clamp(2.8rem, 7.5vw, 5.2rem); font-weight: 700; line-height: 1.02; margin: 1.1rem 0 0.6rem; }
    .hero__title { font-family: var(--font-display); font-size: clamp(1.4rem, 3.4vw, 2.3rem); font-weight: 600; color: var(--text-secondary); min-height: 2.6rem; }
    .hero__desc { max-width: 38rem; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin: 1.4rem 0 0; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 2.2rem; }
    .hero__stats { display: flex; align-items: center; gap: 1.6rem; margin-top: 3rem; flex-wrap: wrap; }
    .stat__value { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; background: linear-gradient(120deg, var(--primary), var(--secondary)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .stat__label { font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.15rem; }
    .stat__divider { width: 1px; height: 2.4rem; background: var(--border); }

    .hero__right { display: flex; justify-content: center; }
    .profile { position: relative; width: min(340px, 72vw); aspect-ratio: 1; border-radius: 2rem; display: grid; place-items: center; padding: 1.2rem; }
    .profile img { width: 100%; height: 100%; object-fit: cover; border-radius: 1.5rem; }
    .profile__ring-spin {
      position: absolute;
      inset: -14px;
      border-radius: 2.4rem;
      border: 1px dashed color-mix(in srgb, var(--primary) 35%, transparent);
      animation: spin-slow 26s linear infinite;
      pointer-events: none;
    }
    .profile__orbit { position: absolute; inset: -40px; pointer-events: none; }
    .profile__badge {
      position: absolute;
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      font-size: 1.3rem;
      background: var(--card);
      border: 1px solid var(--border);
      box-shadow: 0 12px 30px -10px var(--shadow-color);
      animation: float 5s ease-in-out infinite;
    }
    .profile__badge--1 { top: 0; left: 8%; animation-delay: 0.4s; }
    .profile__badge--2 { top: 22%; right: -4%; animation-delay: 1.2s; }
    .profile__badge--3 { bottom: 10%; right: 14%; animation-delay: 2s; }
    .profile__badge--4 { bottom: -8%; left: 24%; animation-delay: 0.8s; }

    .grid-featured { display: grid; grid-template-columns: 1fr; gap: 1.8rem; }
    @media (min-width: 768px) { .grid-featured { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .grid-featured { grid-template-columns: repeat(3, 1fr); } }
    .featured-skeleton { border-radius: 1.25rem; overflow: hidden; background: var(--card); border: 1px solid var(--border); }
    .featured-skeleton__body { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.8rem; }
    .hero__more { display: flex; justify-content: center; margin-top: 3rem; }
  `,
})
export class HomeComponent implements OnInit {
  readonly typingPhrases = [
    'Java Full Stack Developer',
    'Spring Boot Specialist',
    'Angular Developer',
    'Microservices Developer',
    'REST API Engineer',
  ];

  readonly loading = signal(true);
  readonly featuredProjects = signal<Project[]>([]);
  readonly resumeDownloading = signal(false);

  private readonly projectService = inject(ProjectService);
  private readonly resumeService = inject(ResumeService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update('Home', 'Java Full Stack Developer building scalable, secure full-stack applications.');
    this.projectService.getAll({ featured: true }).subscribe({
      next: (res) => this.featuredProjects.set(res.data),
      complete: () => this.loading.set(false),
    });
  }

  downloadResume(): void {
    if (this.resumeDownloading()) return;
    this.resumeDownloading.set(true);
    this.resumeService.getActive().subscribe({
      next: (resume: Resume) => {
        const link = document.createElement('a');
        link.href = resume.fileUrl;
        link.download = resume.fileName;
        link.target = '_blank';
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.resumeDownloading.set(false);
      },
      error: () => this.resumeDownloading.set(false),
    });
  }
}
