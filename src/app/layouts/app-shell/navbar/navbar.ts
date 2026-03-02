import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../features/dashboard/users/api/users.service';
import { CreateUserDTO, User } from '../../../features/dashboard/users/model/users.model';
import { AuthService } from './../../../core/services/auth/auth.service';
import { ButtonSecondary } from "../../../shared/ui/button-secondary/button-secondary";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faBell, faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonSecondary, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected user: User | null = null

  private router = inject(Router);
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  protected readonly faSearch = faSearch;
  protected readonly faBell = faBell;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faChevronDown = faChevronDown;

  get pageTitle(): string {
    const url = this.router.url;

    if (url.includes('/home')) return 'Home';
    if (url.includes('/category')) return 'Categorías';
    if (url.includes('/category/create')) return 'Crear Categoría';
    if (url.includes('/forms')) return 'Formularios';
    if (url.includes('/forms')) return 'Productos';

    return 'Dashboard';
  }

  // protected download(){
  //   this.filesService.getFile('My-pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf').subscribe();
  // }

  protected createUser(){
    const payload: CreateUserDTO = {
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123456789',
      avatar: 'http://192.168.10.32:8200/swagger/index.html'
    }
    this.userService.create(payload).subscribe({
      next: () => {
        alert('Poderoso')
      }
    });
  }
}
