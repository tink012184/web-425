// src/app/shared/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    // Restore from session storage (so refresh doesn't forget)
    this.loggedIn = sessionStorage.getItem('loggedIn') === 'true';
  }

  login(username: string): void {
    this.loggedIn = true;
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
  }

  logout(): void {
    this.loggedIn = false;
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }
}