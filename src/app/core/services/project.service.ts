import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { PROJECTS } from '../data/portfolio-data';
import type { ApiResponse } from '../models/api-response';
import type { Project } from '../models/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  getAll(params?: Record<string, string | number | boolean | undefined | null>): Observable<ApiResponse<Project[]>> {
    let filtered = [...PROJECTS];

    if (params?.['featured'] === true || params?.['featured'] === 'true') {
      filtered = filtered.filter((project) => project.featured);
    }

    if (params?.['sort'] === 'sortOrder,asc') {
      filtered.sort((a, b) => a.sortOrder - b.sortOrder);
    } else if (params?.['sort'] === 'sortOrder,desc') {
      filtered.sort((a, b) => b.sortOrder - a.sortOrder);
    }

    return of({
      status: 'OK',
      message: 'Projects retrieved successfully',
      timestamp: new Date().toISOString(),
      data: filtered,
    });
  }
}
