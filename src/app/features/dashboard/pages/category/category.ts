import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryModel } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  protected readonly categories = signal<CategoryModel[]>([])

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
}
