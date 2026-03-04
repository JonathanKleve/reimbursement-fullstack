import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogin() {
    this.http.post<any>('http://localhost:8080/api/login', this.credentials)
      .subscribe({
        next: (user) => {
          this.authService.login(user);
          this.router.navigate(['/reimbursements']); // Send them to the list
        },
        error: (err) => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
