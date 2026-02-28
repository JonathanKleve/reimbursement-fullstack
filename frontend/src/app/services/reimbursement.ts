import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reimbursement } from '../models/reimbursement';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  private apiUrl = 'http://localhost:8080/api/reimbursements';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {  }

  getReimbursements(): Observable<Reimbursement[]> {
    const user = this.authService.getCurrentUser();
    
    if(!user) {
      return of([]);
    }

    return this.http.get<Reimbursement[]>(
      `http://localhost:8080/api/reimbursements?authorId=${user.id}&role=${user.role}`
    );
  }

  createReimbursement(reimbursement: Reimbursement): Observable<Reimbursement> {
    return this.http.post<Reimbursement>(this.apiUrl, reimbursement);
  }

  updateStatus(id: number, newStatus: string) {
    // send an object { status: 'APPROVED' } which matches the Java helper class
    return this.http.patch(`http://localhost:8080/api/reimbursements/${id}`, {status: newStatus});
  }
}