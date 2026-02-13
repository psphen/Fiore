import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarEcommerce } from '../../../../shared/components/navbar-ecommerce/navbar-ecommerce';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { ProductService } from '../../../../services/product/product.service';
import { CategoryService } from '../../../../services/category/category.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarEcommerce, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly allProducts = signal<Product[]>([]);
  protected readonly displayedProducts = signal<Product[]>([]);
  protected readonly loading = signal<boolean>(false);
  protected readonly selectedCategory = signal<number | null>(null);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadAllProducts();
  }

  protected loadAllProducts(): void {
    this.loading.set(true);
    this.productService.get().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.displayedProducts.set(products);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
      }
    });
  }

  protected onCategorySelected(categoryId: number | null): void {
    if (categoryId === null) {
      this.displayedProducts.set(this.allProducts());
    } else {
      this.loading.set(true);
      this.categoryService.getProductsByCategory(categoryId).subscribe({
        next: (products) => {
          this.displayedProducts.set(products);
          this.loading.set(false);
        },
        error: (error) => {
          this.displayedProducts.set([]);
          this.loading.set(false);
        }
      });
    }
  }
}
