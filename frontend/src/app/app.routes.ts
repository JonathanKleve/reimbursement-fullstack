import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { ReimbursementList } from './components/reimbursement-list/reimbursement-list';

export const routes: Routes = [
  { path: 'users', component: UserList },
  { path: 'reimbursements', component: ReimbursementList },
  { path: '', redirectTo: 'reimbursements', pathMatch: 'full' } // Default to the list
];