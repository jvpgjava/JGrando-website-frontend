import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactRequest, ContactResponse, ProfileResponse } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private profileBase = environment.apiBaseUrl;
  private contactBase = environment.contactApiBaseUrl || environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileResponse> {
    return of({
      personalInfo: {
        name: '',
        headline: '',
        location: '',
        email: '',
        phone: '',
        summary: '',
        socials: []
      },
      skills: [],
      experiences: [],
      projects: [],
      services: []
    });
  }

  sendContact(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.contactBase}/contact`, payload);
  }
}

