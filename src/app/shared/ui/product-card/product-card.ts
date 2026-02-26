import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../features/dashboard/product/models/product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
}
