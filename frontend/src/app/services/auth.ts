import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  setCurrentUser(user: User) {
    this.currentUser = user;
    //save locally so refreshing doesn't log you out
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const saved = localStorage.getItem('user');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
