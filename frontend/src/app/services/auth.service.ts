import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(false);
  currentUserId = signal<string | null>(null);
  showAuth = signal(false);
  authMode = signal<'login' | 'signup'>('login');

  openLogin() { this.authMode.set('login'); this.showAuth.set(true); }
  openSignup() { this.authMode.set('signup'); this.showAuth.set(true); }
  close() { this.showAuth.set(false); }

  login(userId: string) {
    this.isLoggedIn.set(true);
    this.currentUserId.set(userId);
    this.showAuth.set(false);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.currentUserId.set(null);
  }
}