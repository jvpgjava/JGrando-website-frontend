import { Injectable } from '@angular/core';
import { ProfileResponse } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileStoreService {
  private profileSubject = new BehaviorSubject<ProfileResponse | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');

  profile$ = this.profileSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor() {}

  async ensureLoaded(): Promise<void> {
    if (this.loadingSubject.value) return;
    this.loadingSubject.next(false);
    this.errorSubject.next('');
    this.profileSubject.next(null);
  }
}

