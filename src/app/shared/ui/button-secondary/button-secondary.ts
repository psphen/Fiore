import { Component, input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-button-secondary',
  imports: [NgClass],
  templateUrl: './button-secondary.html',
  styleUrl: './button-secondary.css',
})
export class ButtonSecondary {
  protected readonly type = input<'button' | 'submit' | 'reset'>('button');

  protected getButtonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-white hover:bg-pink-100 shadow-sm px-3 py-2.5 text-md';

    return baseClasses;
  }
}
