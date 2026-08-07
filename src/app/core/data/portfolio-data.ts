import type { Skill } from '../models/skill';
import type { Experience } from '../models/experience';
import type { Education } from '../models/education';
import type { Project } from '../models/project';
import type { Resume } from '../models/resume';

export const PORTFOLIO_NAME = 'Sureshkumar M';
export const PORTFOLIO_ROLE = 'Java Full Stack Developer';
export const PORTFOLIO_EMAIL = 'sureshm.852001@gmail.com';
export const PORTFOLIO_PHONE = '+91 9786271736';
export const PORTFOLIO_PHONE_TEL = '+919786271736';
export const PORTFOLIO_LINKEDIN = 'https://www.linkedin.com/in/sureshkumar-m-665981227/';
export const PORTFOLIO_LOCATION = 'Chennai, Tamil Nadu, India';
export const PORTFOLIO_MONOGRAM = 'SM';

export const SKILLS: Skill[] = [
  { id: 1, name: 'Java 17', category: 'BACKEND', level: 92, sortOrder: 1, featured: true, yearsOfExperience: 3 },
  { id: 2, name: 'Spring Boot', category: 'BACKEND', level: 95, sortOrder: 2, featured: true, yearsOfExperience: 3 },
  { id: 3, name: 'Spring MVC', category: 'BACKEND', level: 88, sortOrder: 3, featured: false, yearsOfExperience: 3 },
  { id: 4, name: 'Spring Data JPA / Hibernate', category: 'BACKEND', level: 90, sortOrder: 4, featured: true, yearsOfExperience: 3 },
  { id: 5, name: 'REST APIs', category: 'BACKEND', level: 92, sortOrder: 5, featured: true, yearsOfExperience: 3 },
  { id: 6, name: 'Microservices', category: 'BACKEND', level: 85, sortOrder: 6, featured: true, yearsOfExperience: 2 },
  { id: 7, name: 'Spring Security', category: 'BACKEND', level: 82, sortOrder: 7, featured: false, yearsOfExperience: 2 },

  { id: 8, name: 'Angular', category: 'FRONTEND', level: 88, sortOrder: 1, featured: true, yearsOfExperience: 2 },
  { id: 9, name: 'Angular Material', category: 'FRONTEND', level: 84, sortOrder: 2, featured: false, yearsOfExperience: 2 },
  { id: 10, name: 'TypeScript', category: 'FRONTEND', level: 85, sortOrder: 3, featured: true, yearsOfExperience: 2 },
  { id: 11, name: 'JavaScript', category: 'FRONTEND', level: 85, sortOrder: 4, featured: true, yearsOfExperience: 3 },
  { id: 12, name: 'HTML5 & CSS3', category: 'FRONTEND', level: 88, sortOrder: 5, featured: true, yearsOfExperience: 3 },
  { id: 13, name: 'Bootstrap', category: 'FRONTEND', level: 84, sortOrder: 6, featured: false, yearsOfExperience: 2 },
  { id: 14, name: 'RxJS', category: 'FRONTEND', level: 80, sortOrder: 7, featured: false, yearsOfExperience: 2 },

  { id: 15, name: 'MySQL', category: 'DATABASE', level: 90, sortOrder: 1, featured: true, yearsOfExperience: 3 },
  { id: 16, name: 'Stored Procedures', category: 'DATABASE', level: 82, sortOrder: 2, featured: false, yearsOfExperience: 3 },
  { id: 17, name: 'Query Optimization', category: 'DATABASE', level: 85, sortOrder: 3, featured: true, yearsOfExperience: 3 },
  { id: 18, name: 'Indexing', category: 'DATABASE', level: 82, sortOrder: 4, featured: false, yearsOfExperience: 3 },

  { id: 19, name: 'Git & GitHub', category: 'TOOLS', level: 88, sortOrder: 1, featured: true, yearsOfExperience: 3 },
  { id: 20, name: 'Jenkins (CI/CD)', category: 'TOOLS', level: 78, sortOrder: 2, featured: false, yearsOfExperience: 3 },
  { id: 21, name: 'IntelliJ IDEA & VS Code', category: 'TOOLS', level: 88, sortOrder: 3, featured: false, yearsOfExperience: 3 },
  { id: 22, name: 'Postman & Swagger', category: 'TOOLS', level: 88, sortOrder: 4, featured: true, yearsOfExperience: 3 },
  { id: 23, name: 'SonarQube', category: 'TOOLS', level: 80, sortOrder: 5, featured: false, yearsOfExperience: 2 },
  { id: 24, name: 'AWS S3', category: 'TOOLS', level: 80, sortOrder: 6, featured: false, yearsOfExperience: 2 },
  { id: 25, name: 'Docker', category: 'TOOLS', level: 75, sortOrder: 7, featured: false, yearsOfExperience: 1 },
  { id: 26, name: 'AI Assistants (Claude Code, OpenCode AI)', category: 'TOOLS', level: 72, sortOrder: 8, featured: false, yearsOfExperience: 1 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: 'BOTREE SOFTWARE INTERNATIONAL PVT LTD',
    role: 'Software Engineer',
    location: 'Chennai, Tamil Nadu',
    startDate: '2023-06-01',
    endDate: '2026-05-01',
    current: false,
    summary:
      'Developed and maintained enterprise applications for Distributor Management Systems — building secure REST APIs, microservices and responsive Angular frontends used by FMCG distributors.',
    responsibilities: [
      'Developed and maintained enterprise applications using Java 17, Spring Boot, Angular, Hibernate/JPA, and MySQL.',
      'Designed and implemented secure RESTful APIs with Spring Security, JWT Authentication, and Swagger/OpenAPI.',
      'Developed and enhanced Microservices, implementing business requirements and integrating services through REST APIs.',
      'Built responsive Angular screens, Reactive Forms, and integrated frontend modules with backend APIs.',
      'Optimized MySQL queries, stored procedures and indexing to improve application performance.',
      'Developed data synchronization services, scheduler jobs, and ETL processes for the Distributor Management System.',
      'Integrated AWS S3 for file storage and distributor data processing.',
      'Implemented Change Requests (CRs), resolved production issues, and collaborated with QA and business teams throughout the SDLC.',
      'Participated in code reviews, Git version control, and CI/CD deployments using Jenkins while maintaining code quality with SonarQube.',
    ],
    technologies: [
      'Java 17',
      'Spring Boot',
      'Angular',
      'Hibernate/JPA',
      'MySQL',
      'Spring Security',
      'JWT',
      'Microservices',
      'REST APIs',
      'AWS S3',
      'Jenkins',
      'SonarQube',
    ],
    achievements: [],
    sortOrder: 1,
  },
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    institution: 'Sona College of Technology',
    degree: 'B.Tech – Information Technology',
    field: 'Information Technology',
    startDate: '2018-09-01',
    endDate: '2022-04-30',
    score: 'CGPA 7.4',
    description:
      'Graduated with a CGPA of 7.4, building strong foundations in software engineering, data structures, databases and web technologies.',
    achievements: ['CGPA: 7.4'],
    sortOrder: 1,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Kenvue – Johnson & Johnson (India)',
    subtitle: 'Enterprise Distributor Management System',
    description:
      'Developed enterprise Distributor Management System (DMS) modules for Order Booking, Billing, Inventory, Sales Return and Collections for a global healthcare brand.',
    features: [
      'Built DMS modules for Order Booking, Billing, Inventory, Sales Return and Collections.',
      'Designed and implemented secure REST APIs with Spring Boot, JWT Authentication and Spring Security.',
      'Built Microservices with real-time SFA integration services for distributor operations.',
      'Optimized Hibernate mappings, MySQL queries and indexing — improving API performance by 30%.',
      'Integrated AWS S3 for distributor file uploads and ETL processing.',
    ],
    architecture:
      'Microservices built with Spring Boot, exposed through REST APIs and integrated with a real-time SFA service for distributor operations.',
    technologies: ['Java 17', 'Spring Boot', 'Microservices', 'REST APIs', 'Hibernate', 'MySQL', 'AWS S3', 'JWT'],
    tags: ['Spring Boot', 'Microservices', 'Java', 'MySQL', 'AWS'],
    startDate: '2023-06-01',
    endDate: '2025-10-31',
    featured: true,
    status: 'COMPLETED',
    sortOrder: 1,
    createdAt: '2023-06-01',
    updatedAt: '2025-10-31',
  },
  {
    id: 2,
    title: 'Kenvue – Johnson & Johnson (Philippines)',
    subtitle: 'Full-Stack Distributor Operations',
    description:
      'Developed full-stack modules for inventory, pricing and distributor operations; customized MySQL schema and Hibernate entity mappings for country-specific business workflows.',
    features: [
      'Developed full-stack modules for inventory, pricing and distributor operations.',
      'Built Spring Boot REST APIs and integrated Angular applications using HttpClient and RxJS.',
      'Developed responsive Angular screens with Reactive Forms and Bootstrap.',
      'Customized MySQL schema and Hibernate entity mappings for country-specific business workflows.',
      'Collaborated with cross-functional teams to deliver production releases in Agile environments.',
    ],
    architecture:
      'Spring Boot REST API backend integrated with an Angular frontend, tailored for country-specific business workflows.',
    technologies: ['Java 17', 'Spring Boot', 'Angular', 'REST APIs', 'Hibernate', 'MySQL', 'AWS S3', 'RxJS'],
    tags: ['Spring Boot', 'Angular', 'Java', 'MySQL'],
    startDate: '2025-11-01',
    endDate: '2026-05-31',
    featured: true,
    status: 'COMPLETED',
    sortOrder: 2,
    createdAt: '2025-11-01',
    updatedAt: '2026-05-31',
  },
  {
    id: 3,
    title: 'TRIMS – Retail Billing & Inventory Management',
    subtitle: 'Personal Project',
    description:
      'A full-stack retail billing and inventory management application with JWT authentication, role-based access control and JasperReports invoice generation, containerized with Docker.',
    features: [
      'Built REST APIs for Product, Inventory, Customer, Billing and Dashboard modules.',
      'Implemented JWT Authentication, Role-Based Access Control and JasperReports invoice generation.',
      'Built responsive Angular UI with Angular Material, Reactive Forms and RxJS.',
      'Designed an optimized MySQL database schema.',
      'Containerized the application using Docker.',
    ],
    architecture:
      'Spring Boot REST API plus an Angular Material single-page application backed by MySQL, packaged with Docker.',
    technologies: ['Java 17', 'Spring Boot', 'Angular 20', 'MySQL', 'JWT', 'Docker', 'JasperReports'],
    tags: ['Spring Boot', 'Angular', 'Java', 'MySQL', 'Docker'],
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    featured: true,
    status: 'COMPLETED',
    sortOrder: 3,
    createdAt: '2026-05-01',
    updatedAt: '2026-07-31',
  },
  {
    id: 4,
    title: 'Nestlé – Global Distributor Management',
    subtitle: 'Enterprise DMS Platform',
    description:
      'Delivered distributor management modules for a global FMCG leader, streamlining order-to-cash operations across multiple regions.',
    features: [
      'Developed Order Booking, Billing and Inventory modules tailored for FMCG distributor workflows.',
      'Built secure Spring Boot REST APIs with JWT authentication and role-based access.',
      'Integrated real-time distributor analytics dashboards with Angular and RxJS.',
      'Optimized MySQL queries and indexing for high-volume transactional workloads.',
      'Collaborated with onshore teams in Agile sprints to ship production releases.',
    ],
    architecture:
      'Spring Boot microservices exposed through REST APIs, integrated with an Angular frontend and a MySQL data layer.',
    technologies: ['Java 17', 'Spring Boot', 'Angular', 'REST APIs', 'Microservices', 'Hibernate', 'MySQL'],
    tags: ['Spring Boot', 'Angular', 'Java', 'Microservices', 'MySQL'],
    startDate: '2023-01-01',
    endDate: '2024-06-30',
    featured: true,
    status: 'COMPLETED',
    sortOrder: 4,
    createdAt: '2023-01-01',
    updatedAt: '2024-06-30',
  },
  {
    id: 5,
    title: 'PVMI – Distributor & Retail Operations',
    subtitle: 'Supply-Chain Operations Platform',
    description:
      'Built supply-chain and retail operations modules for a consumer manufacturing business, covering order processing, inventory and sales reporting.',
    features: [
      'Developed order processing, inventory and sales-reporting modules.',
      'Built REST APIs with Spring Boot and optimized Hibernate mappings for large datasets.',
      'Created Angular screens for real-time operational dashboards.',
      'Automated report generation and data exports for stakeholders.',
      'Improved data load times through query tuning and indexing.',
    ],
    architecture:
      'Spring Boot REST API backend with an Angular operational dashboard and MySQL database.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'REST APIs', 'MySQL', 'Hibernate'],
    tags: ['Spring Boot', 'Angular', 'Java', 'MySQL'],
    startDate: '2022-06-01',
    endDate: '2023-05-31',
    featured: true,
    status: 'COMPLETED',
    sortOrder: 5,
    createdAt: '2022-06-01',
    updatedAt: '2023-05-31',
  },
];

export const RESUME: Resume = {
  id: 1,
  title: 'Resume',
  fileName: 'Sureshkumar-M-Resume.pdf',
  fileUrl: 'assets/resume.pdf',
  fileType: 'application/pdf',
  fileSize: 0,
  version: 1,
  active: true,
  uploadedAt: '2026-08-01',
};
