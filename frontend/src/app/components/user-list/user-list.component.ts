import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  editingUser: User | null = null;
  showCreateForm: boolean = false;
  newUser: any = {username: '', password: '', role: 'EMPLOYEE'};
  searchText: string = '';

  constructor(private userService: UserService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if(user && user.role === 'MANAGER') {
          this.loadUsers();
        } else if (user && user.role !== 'MANAGER') {
          this.errorMessage = "Access Denied: Manager role required";
          this.isLoading = false;
        }
      }
    });
    
  }

  loadUsers(silent: boolean = false): void {
    if (!silent) {
      this.isLoading = true;
    }
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges();
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
          this.loadUsers(true);
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Could not delete user. They might have active reimbursement requests.');
        }
      });
    }
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  saveUserUpdate(): void {
    if (this.editingUser && this.editingUser.id) {
      this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe({
        next: (updated) => {
          this.loadUsers(true);
          this.editingUser = null;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Update failed", err)
      });
    }
  }

  submitNewUser(): void {
    if (!this.newUser.username || !this.newUser.password) {
      alert("Username and Password are required.");
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: (created) => {
        this.loadUsers(true);
        this.resetNewUserForm();
        this.showCreateForm = false;
      },
      error: (err) => alert("Failed to create user. Username might already exist.")
    });
  }

  resetNewUserForm(): void {
    this.newUser = { username: '', password: '', role: 'EMPLOYEE' };
  }

  get filteredUsers(): User[] {
    return this.users.filter(user => 
      user.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
      user.role.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
