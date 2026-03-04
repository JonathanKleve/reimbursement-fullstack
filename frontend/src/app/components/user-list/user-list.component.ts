import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'MANAGER') {
      this.loadUsers();
    } else {
      this.isLoading = false;
      this.errorMessage = "Please click 'User Management' to referesh the view.";
    }
    /*
    this.authService.currentUser$.subscribe({
      next: (user) => {
        console.log("User Recieved in component:", user);

        if(user && user.role === 'MANAGER') {
          this.loadUsers();
        } else if (user && user.role !== 'MANAGER') {
          this.errorMessage = "Access Denied: Manager role required";
          this.isLoading = false;
        }
      }
    });
    */
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users: ', err);
        this.errorMessage = 'Could not load users. Please check if the server is running.';
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log(`User ${id} deleted successfully`);
          this.loadUsers();
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Could not delete user. They might have active reimbursement requests.');
        }
      });
    }
  }
}
