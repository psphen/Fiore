import { Component } from '@angular/core';
import { SidebarOptions } from './components/sidebar-options/sidebar-options';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarOptions],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
