import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.hydrateUser();
  }

  private hydrateUser() {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser && savedUser !== 'undefined') {
      try {
        this.currentUserSubject.next(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('loggedUser');
      }
    }
  }

  login(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.currentUserSubject.next(null);
  }

   getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
