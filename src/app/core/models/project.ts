export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  architecture?: string;
  technologies: string[];
  tags: string[];
  startDate?: string;
  endDate?: string;
  featured: boolean;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  architecture?: string;
  technologies: string[];
  tags: string[];
  startDate?: string;
  endDate?: string;
  featured: boolean;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
  sortOrder: number;
}
