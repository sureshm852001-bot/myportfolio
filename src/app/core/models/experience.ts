export interface Experience {
  id: number;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  sortOrder: number;
  companyLogoUrl?: string;
}

export interface ExperienceRequest {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  sortOrder: number;
  companyLogoUrl?: string;
}
