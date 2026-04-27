import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch, faUser, faEdit, faTrash, faEnvelope, faPhone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { User, MOCK_USERS } from '../../model/users.model';

@Component({
  selector: 'app-list-user',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './list-user.html',
  styleUrl: './list-user.css',
})
export class ListUser implements OnInit {
  faSearch = faSearch;
  faUser = faUser;
  faEdit = faEdit;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCalendarAlt = faCalendarAlt;

  protected readonly users = signal<User[]>(MOCK_USERS);
  
  protected searchQuery = signal('');
  protected selectedRole = signal<string>('all');
  protected selectedStatus = signal<string>('all');
  protected selectedUser = signal<User | null>(null);

  protected readonly filteredUsers = computed(() => {
    let result = [...this.users()];

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(
        u => u.name.toLowerCase().includes(query) || 
            u.email.toLowerCase().includes(query)
      );
    }

    const role = this.selectedRole();
    if (role !== 'all') {
      result = result.filter(u => u.role === role);
    }

    const status = this.selectedStatus();
    if (status !== 'all') {
      result = result.filter(u => u.status === status);
    }

    return result;
  });

  protected readonly stats = computed(() => {
    const users = this.users();
    return {
      total: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      customers: users.filter(u => u.role === 'customer').length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
    };
  });

  ngOnInit(): void {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onRoleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRole.set(value);
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }

  onUserClick(user: User) {
    this.selectedUser.set(user);
  }

  closeDetail() {
    this.selectedUser.set(null);
  }

  getRoleClass(role: string): string {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  }

  getRoleLabel(role: string): string {
    return role === 'admin' ? 'Admin' : 'Cliente';
  }

  getStatusClass(status: string): string {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  }
}