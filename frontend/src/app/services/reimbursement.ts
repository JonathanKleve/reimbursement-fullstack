import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  private apiUrl = 'http://localhost:8080/api/reimbursements';

  constructor(private http: HttpClient) { }

  getReimbursements(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(this.apiUrl);
  }

  createReimbursement(reimbursement: Reimbursement): Observable<Reimbursement> {
    return this.http.post<Reimbursement>(this.apiUrl, reimbursement);
  }
}