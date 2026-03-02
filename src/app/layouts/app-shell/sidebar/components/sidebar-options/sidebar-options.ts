import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from './sidebar-options.model';

@Component({
  selector: 'app-sidebar-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-options.html',
  styleUrl: './sidebar-options.css',
})
export class SidebarOptions {
  protected readonly menuGeneral = signal<MenuItem[]>([
    { path: '/dashboard/home', label: 'Dashboard', icon: 'grid_view' },
    { path: '*', label: 'Ordenes', icon: 'shopping_bag' },
    { path: '/dashboard/product', label: 'Productos', icon: 'auto_awesome' },
    { path: '/dashboard/category', label: 'Categorías', icon: 'category' },
    { path: '*', label: 'Clientes', icon: 'person' },
  ]);

  protected readonly menuManagement = signal<MenuItem[]>([
    { path: '*', label: 'Inventario', icon: 'format_list_bulleted' },
    { path: '*', label: 'Estadística', icon: 'trending_up' },
    { path: '*', label: 'Calendario', icon: 'calendar_today' },
    { path: '*', label: 'Proovedores', icon: 'menu_book' },
  ]);

  protected readonly menuSettings = signal<MenuItem[]>([
    { path: '*', label: 'Perfil', icon: 'manage_accounts' },
  ]);
}
