export type SkillCategory = 'BACKEND' | 'FRONTEND' | 'DATABASE' | 'TOOLS' | 'OTHER';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  sortOrder: number;
  featured: boolean;
}

export interface SkillRequest {
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  sortOrder: number;
  featured: boolean;
}
