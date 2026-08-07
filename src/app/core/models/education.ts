export interface Education {
  id: number;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  score?: string;
  description?: string;
  achievements?: string[];
  sortOrder: number;
  logoUrl?: string;
}

export interface EducationRequest {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  score?: string;
  description?: string;
  achievements?: string[];
  sortOrder: number;
  logoUrl?: string;
}
