import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { SKILLS } from '../data/portfolio-data';
import type { ApiResponse } from '../models/api-response';
import type { Skill } from '../models/skill';

@Injectable({ providedIn: 'root' })
export class SkillService {
  getAll(): Observable<ApiResponse<Skill[]>> {
    return of({
      status: 'OK',
      message: 'Skills retrieved successfully',
      timestamp: new Date().toISOString(),
      data: SKILLS,
    });
  }
}
