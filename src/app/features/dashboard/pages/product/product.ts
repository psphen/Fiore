import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductService } from '../../../../services/product/product.service';
import { ProductModel } from '../../../../models/product.model';
import { CategoryService } from '../../../../services/category/category.service';
import { CategoryModel } from '../../../../models/category.model';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  protected readonly products = signal<ProductModel[]>([]);
  protected readonly categories = signal<CategoryModel[]>([]);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts(){
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  private loadCategories(){
    this.categoryService.getAllCategory().subscribe({
      next: (resp) => {
        this.categories.set(resp);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
