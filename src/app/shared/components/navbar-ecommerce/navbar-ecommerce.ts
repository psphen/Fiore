import { Component, inject, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-navbar-ecommerce',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-ecommerce.html',
  styleUrl: './navbar-ecommerce.css',
})
export class NavbarEcommerce implements OnInit {
  protected readonly categories = signal<Category[]>([]);
  protected readonly selectedCategoryId = signal<number | null>(null);

  categorySelected = output<number | null>();

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadCategories();
  }

  protected loadCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      }
    });
  }

  protected selectCategory(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
    this.categorySelected.emit(categoryId);
  }

  protected isSelected(categoryId: number | null): boolean {
    return this.selectedCategoryId() === categoryId;
  }
}
