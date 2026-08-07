import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { EXPERIENCES } from '../data/portfolio-data';
import type { ApiResponse } from '../models/api-response';
import type { Experience } from '../models/experience';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  getAll(params?: Record<string, string | number | boolean | undefined | null>): Observable<ApiResponse<Experience[]>> {
    const sorted = [...EXPERIENCES].sort((a, b) => {
      const direction = params?.['sort'] === 'sortOrder,asc' ? 1 : -1;
      return (a.sortOrder - b.sortOrder) * direction;
    });
    return of({
      status: 'OK',
      message: 'Experiences retrieved successfully',
      timestamp: new Date().toISOString(),
      data: sorted,
    });
  }
}
