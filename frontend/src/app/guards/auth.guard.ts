import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (state.url.includes('/users') && user.role !== 'MANAGER') {
    alert("Access Denied: you do not have permission to view User Management.");

    router.navigate(['/reimbursements']);
    return false;
  }

  return true;
};