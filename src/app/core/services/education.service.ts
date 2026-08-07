import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { EDUCATION } from '../data/portfolio-data';
import type { ApiResponse } from '../models/api-response';
import type { Education } from '../models/education';

@Injectable({ providedIn: 'root' })
export class EducationService {
  getAll(params?: Record<string, string | number | boolean | undefined | null>): Observable<ApiResponse<Education[]>> {
    const sorted = [...EDUCATION].sort((a, b) => {
      const direction = params?.['sort'] === 'sortOrder,asc' ? 1 : -1;
      return (a.sortOrder - b.sortOrder) * direction;
    });
    return of({
      status: 'OK',
      message: 'Education retrieved successfully',
      timestamp: new Date().toISOString(),
      data: sorted,
    });
  }
}
