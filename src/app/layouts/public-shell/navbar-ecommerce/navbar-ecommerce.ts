import { Component, inject, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../features/dashboard/category/api/category.service';
import { Category } from '../../../features/dashboard/category/models/category.model';

@Component({
  selector: 'app-navbar-ecommerce',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-ecommerce.html',
  styleUrl: './navbar-ecommerce.css',
})
export class NavbarEcommerce implements OnInit {
  protected readonly categories = signal<Category[]>([]);
  protected readonly selectCategoryId = signal<number | null>(null);

  categorySelected = output<number | null>();

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadCategories();
  }

  protected loadCategories(){
    this.categoryService.getAllCategory().subscribe({
      next: (resp) => {
        this.categories.set(resp);
      }
    });
  }

  protected selectCategory(category: number | null){
    this.selectCategoryId.set(category);
    this.categorySelected.emit(category);
  }

  protected isSelected(category: number | null){
    return this.selectCategoryId() === category;
  }
}
