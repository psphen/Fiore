import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarEcommerce } from '../../../layouts/public-shell/navbar-ecommerce/navbar-ecommerce';
import { ProductCard } from '../../../shared/ui/product-card/product-card';
import { ProductService } from '../../dashboard/product/api/product.service';
import { CategoryService } from '../../dashboard/category/api/category.service';
import { Product } from '../../dashboard/product/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarEcommerce, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly loading = signal<Boolean | null>(false);
  protected readonly displayedProducts = signal<Product[]>([]);
  protected readonly allProducts = signal<Product[]>([]);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadProducts();
  }

  protected loadProducts(){
    this.loading.set(true);
    this.productService.get().subscribe({
      next: (resp) => {
        this.displayedProducts.set(resp);
        this.allProducts.set(resp);
        this.loading.set(false);
      }
    });
  }

  protected onCategorySelected(category: number | null){
    if(category == null){
      this.displayedProducts.set(this.allProducts());
    } else {
      this.loading.set(true);
      this.categoryService.getProductsByCategory(category).subscribe({
        next: (resp) => {
          this.displayedProducts.set(resp);
          this.loading.set(false);
        }
      });
    }
  }
}
