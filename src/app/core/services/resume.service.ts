import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { RESUME } from '../data/portfolio-data';
import type { Resume } from '../models/resume';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  getActive(): Observable<Resume> {
    return of(RESUME);
  }
}
