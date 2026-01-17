import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);

  get pageTitle(): string {
    const url = this.router.url;

    if (url.includes('/home')) return 'Home';
    if (url.includes('/category')) return 'Categorías';
    if (url.includes('/category/create')) return 'Crear Categoría';
    if (url.includes('/forms')) return 'Formularios';
    if (url.includes('/forms')) return 'Productos';

    return 'Dashboard';
  }
}
