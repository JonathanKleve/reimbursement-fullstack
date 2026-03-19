import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReimbursementService } from '../../services/reimbursement.service';
import { Reimbursement } from '../../models/reimbursement.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reimbursement-list',
  standalone: true,
  imports: [ CurrencyPipe, FormsModule ],
  templateUrl: './reimbursement-list.component.html',
  styleUrl: './reimbursement-list.component.css'
})
export class ReimbursementListComponent implements OnInit {
  reimbursements: Reimbursement[] = [];
  searchText: string = '';
  statusFilter: string = 'ALL'; //default to show everything

  isUploading: boolean = false;

  selectedReimbursement: Reimbursement | null = null;

  constructor(
    private service: ReimbursementService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.resetForm(); //initialize newReimbursement once the constructor has finished
  }

  newReimbursement: any;

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
    if(!this.newReimbursement.description || this.newReimbursement.amount <= 0) {
      alert("Please provide a description and an amount greater than $0.");
      return;
    }

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

  updateStatus(id: number, newStatus: string) {
    this.service.updateStatus(id, newStatus).subscribe({
      next: (updated) => {
        this.loadReimbursements();
      },
      error: (err) => console.error("Update failed:", err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get filteredReimbursements(): Reimbursement[] {
    return this.reimbursements.filter(r => {
      const matchesSearch = r.description.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = this.statusFilter === 'ALL' || r.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  onFileSelected(event: any): void {
    this.isUploading = true;

    const file: File = event.target.files[0];

    if (file && file.size > 2097152) {
      alert("File is too large! Please upload a file smaller than 2MB.");
      event.target.value = '';
      return;
    }

    if(file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.newReimbursement.receiptImage = reader.result as string;
        this.newReimbursement.receiptType = file.type;
        this.isUploading = false;
      };

      //starts the conversion process
      reader.readAsDataURL(file);
    }
  }

  //sanitize any pdfs before saving the data
  getSafeUrl(base64Data: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Data);
  }

  openReceipt(reimbursement: Reimbursement): void {
    this.selectedReimbursement = reimbursement;
  }

  closeModal(): void {
    this.selectedReimbursement = null;
  }
}
