import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReimbursementService } from '../../services/reimbursement';
import { Reimbursement } from '../../models/reimbursement';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reimbursement-list',
  standalone: true,
  imports: [ CurrencyPipe, FormsModule],
  templateUrl: './reimbursement-list.html',
  styleUrl: './reimbursement-list.css'
})
export class ReimbursementList implements OnInit {
  reimbursements: Reimbursement[] = [];

  constructor(
    private service: ReimbursementService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.newReimbursement.author = currentUser;
    }
  }

  newReimbursement: any = {
    description: '',
    amount: 0,
    author: null //placeholder
  };

  ngOnInit() {
    this.loadReimbursements();
  }

  // Moved fetching logic into its own named function
  loadReimbursements() {
  this.service.getReimbursements().subscribe({
    next: (data) => {
      this.reimbursements = [...data];
      this.cdr.detectChanges();         //Manually trigger a UI refresh because async data arrival sometimes misses the standard angular change detection
    },
    error: (err) => console.error("API Error:", err)
  });
}

  submitRequest() {
    this.service.createReimbursement(this.newReimbursement).subscribe({
      next: (response) => {
        this.loadReimbursements(); // Pull the new list from Java
        this.resetForm();          // Clear the input boxes
      },
      error: (err) => console.error(`Submission failed:`, err)
    });
  }

  resetForm() {
    this.newReimbursement = { 
      description: '', 
      amount: 0, 
      author: this.authService.getCurrentUser() // Keep the ID so the next submission knows who the user is
    };
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
