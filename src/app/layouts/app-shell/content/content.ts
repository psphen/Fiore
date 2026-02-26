import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-content',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {

}
