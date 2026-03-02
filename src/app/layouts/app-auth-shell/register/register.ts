import { Component } from '@angular/core';
import { exitGuard, OnExit } from '../../../core/guards/exit-guard';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  onExit(){
    const rta = confirm('Are you sure you want to leave?');
    return rta;
  }
}
