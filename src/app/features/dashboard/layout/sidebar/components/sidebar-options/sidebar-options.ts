import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-options.html',
  styleUrl: './sidebar-options.css',
})
export class SidebarOptions {
  menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/category', label: 'Categorías' },
    { path: '/forms', label: 'Formularios' }
  ];
}
