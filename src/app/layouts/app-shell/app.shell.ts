import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Content } from "./content/content";
import { Sidebar } from "./sidebar/sidebar";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-shell',
  imports: [Content, Sidebar, Navbar],
  templateUrl: './app.shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShell {

}
