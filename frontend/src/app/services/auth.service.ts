import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal: signal<User | null>(null);

  constructor() {
    this.hydrateUser();
  }

  private hydrateUser() {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser && savedUser !== 'undefined') {
      try {
        this.currentUserSignal.set(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('loggedUser');
      }
    }
  }

  setCurrentUser(user: User) {
    const savedUser = sessionStorage.getItem('loggedUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
    /*
    this.currentUser = user;
    //save locally so refreshing doesn't log you out
    localStorage.setItem('user', JSON.stringify(user));
    */
  }

  login(user: User) {
    this.currentUser = user;
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    /*
    if (!this.currentUser) {
      const saved = localStorage.getItem('user');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
      */
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('loggedUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
