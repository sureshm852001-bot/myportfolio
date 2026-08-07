import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Home', description: 'Java Full Stack Developer building scalable, secure full-stack applications.' },
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    data: { title: 'About', description: 'Professional summary, experience highlights and quick facts.' },
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    data: { title: 'Skills', description: 'Backend, frontend, database and tooling skills with proficiency levels.' },
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then((m) => m.ExperienceComponent),
    data: { title: 'Experience', description: 'Professional work experience timeline.' },
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
    data: { title: 'Projects', description: 'Selected projects with architecture, features and live demos.' },
  },
  {
    path: 'education',
    loadComponent: () => import('./features/education/education.component').then((m) => m.EducationComponent),
    data: { title: 'Education', description: 'Academic background and qualifications.' },
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: { title: 'Contact', description: 'Get in touch — let us build something great together.' },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
