import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Category as CategoryModel } from '../models/category.model';
import { CategoryService } from './../api/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../product/models/product.model';
import { ProductsModal } from '../../../../shared/ui/products-modal/products-modal';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  protected readonly categories = signal<CategoryModel[]>([])
  protected readonly products = signal<Product[]>([]);

  readonly dialog = inject(MatDialog);

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadCategory()
  }

  protected loadCategory(){
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      }
    })
  }

  protected openProductsModal(category: CategoryModel): void {
    this.categoryService.getProductsByCategory(category.id).subscribe({
      next: (resp) => {
        this.dialog.open(ProductsModal, {
          width: '900px',
          maxWidth: '95vw',
          data: {
            products: resp,
            categoryName: category.name
          }
        });
      },
      error: () => {
        this.dialog.open(ProductsModal, {
          width: '900px',
          maxWidth: '95vw',
          data: {
            products: [],
            categoryName: category.name
          }
        });
      }
    });
  }
}
