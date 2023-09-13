import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: { id: number, email: string, name: string } | null = null;

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  login(email: string, password: string): boolean {
    const authenticatedUser = this.authenticateUser(email, password);

    if (authenticatedUser) {
      this.loggedInUser = authenticatedUser;
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  getLoggedInUser(): { id: number, email: string, name: string } | null {
    return this.loggedInUser;
  }

  private authenticateUser(email: string, password: string): { id: number, email: string, name: string } | null {
    if (email === 'user' && password === 'password') {
      return { id: 1, email: 'user', name: 'John' };
    }

    return null;
  }
}
