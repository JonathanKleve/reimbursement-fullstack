import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { ReimbursementList } from './components/reimbursement-list/reimbursement-list';
import { authGuard } from './guards/auth.guard';
import { Login } from './components/login/login';

export const routes: Routes = [
  {path: 'login', component: Login },
  { path: 'users', component: UserList, canActivate: [authGuard] },
  { path: 'reimbursements', component: ReimbursementList, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default to the login page
];