import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReimbursementListComponent } from './components/reimbursement-list/reimbursement-list.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'reimbursements', component: ReimbursementListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default to the login page
];