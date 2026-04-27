import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faPencil, faTrash, faTags, faBox } from '@fortawesome/free-solid-svg-icons';
import { Category as CategoryModel } from '../models/category.model';
import { CategoryService } from './../api/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../product/models/product.model';
import { ProductsModal } from '../../../../shared/ui/products-modal/products-modal';

@Component({
  selector: 'app-category',
  imports: [RouterLink, FormsModule, FaIconComponent],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  protected readonly categories = signal<CategoryModel[]>([])
  protected readonly filteredCategories = signal<CategoryModel[]>([]);
  protected readonly products = signal<Product[]>([]);
  protected readonly searchTerm = signal<string>('');

  faPlus = faPlus;
  faSearch = faSearch;
  faPencil = faPencil;
  faTrash = faTrash;
  faTags = faTags;
  faBox = faBox;

  readonly dialog = inject(MatDialog);

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadCategory()
  }

  protected loadCategory(){
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
      }
    })
  }

  protected onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.applyFilter();
  }

  private applyFilter() {
    const term = this.searchTerm().toLowerCase();
    const allCategories = this.categories();
    
    if (!term) {
      this.filteredCategories.set([...allCategories]);
      return;
    }

    const filtered = allCategories.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.slug.toLowerCase().includes(term)
    );
    this.filteredCategories.set(filtered);
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
