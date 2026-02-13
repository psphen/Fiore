import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Category, CategoryDTO } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/categories`;

  getAllCategory(){
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(id: string){
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
  }

  getProductsByCategory(id: number){
    return this.http.get<Product[]>(`${this.apiUrl}/${id}/products`);
  }

  createCategory(data: Partial<CategoryDTO> | FormData){
    return this.http.post<Category>(this.apiUrl, data);
  }

  updateCategory(id: number, data: Partial<CategoryDTO>){
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data);
  }

  checkCategory(name: string){
    return this.http.post(`${environment.apiUrl}/categories/availability`, {name});
  }
}
