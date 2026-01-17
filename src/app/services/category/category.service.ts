import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CategoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  getAllCategory(){
    return this.http.get<CategoryModel[]>(`${environment.apiUrl}/api/v1/categories`);
  }

  getCategory(id: string){
    return this.http.get<CategoryModel>(`${environment.apiUrl}/api/v1/categories/${id}`)
  }

  createCategory(data: Partial<CategoryModel> | FormData){
    return this.http.post<CategoryModel>(`${environment.apiUrl}/api/v1/categories`, data);
  }

  updateCategory(id: string, data: Partial<CategoryModel>){
    return this.http.put<CategoryModel>(`${environment.apiUrl}/api/v1/categories/${id}`, data);
  }

  checkCategory(name: string){
    return this.http.post(`${environment.apiUrl}/categories/availability`, {name});
  }
}
