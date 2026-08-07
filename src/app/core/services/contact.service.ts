import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import type { ContactMessage, ContactRequest } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
  submit(message: ContactRequest): Observable<ContactMessage> {
    const saved: ContactMessage = {
      ...message,
      id: 1,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    return of(saved);
  }
}
