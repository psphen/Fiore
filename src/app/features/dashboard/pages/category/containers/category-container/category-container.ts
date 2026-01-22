import { Component, inject, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { CategoryService } from '../../../../../../services/category/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryForm } from "../../component/category-form/category-form";
import { CategoryModel } from '../../../../../../models/category.model';

@Component({
  selector: 'app-category-container',
  imports: [CategoryForm],
  templateUrl: './category-container.html',
  styleUrl: './category-container.css',
})
export class CategoryContainer implements OnInit {
  protected categoryModel = signal<CategoryModel | null>(null);

  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if(params['id']){
        this.getCategory(params['id']);
      }
    });
  }

  createCategory(data: Partial<CategoryModel>){
    this.categoryService.createCategory(data).subscribe({
      next: (resp) => {
        this.router.navigate(['category']);
      },
    });
  }

  updateCategory(data: Partial<CategoryModel>){
    const category = this.categoryModel();
    if(category && category.id){
      this.categoryService.updateCategory(category.id, data).subscribe({
        next: (resp) => {
          this.router.navigate(['category']);
        },
      });
    }
  }

  private getCategory(id: string){
    this.categoryService.getCategory(id).subscribe({
      next: (resp) => {
        this.categoryModel.set(resp)
      },
    });
  }
}
