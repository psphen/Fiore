import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-personal',
  imports: [CommonModule],
  templateUrl: './product-personal.html',
  styleUrl: './product-personal.scss',
})
export class ProductPersonal {
  @Input() product: Product | null = null;
  @Output() closeDetail = new EventEmitter<void>();

  protected close(){
    this.closeDetail.emit();
  }
}
