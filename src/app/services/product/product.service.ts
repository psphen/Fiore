import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAllProducts(){
    return this.http.get<ProductModel[]>(`${environment.apiUrl}/api/v1/products`);
  }

  getProduct(id: number){
    return this.http.get<ProductModel>(`${environment.apiUrl}/api/v1/products/${id}`)
  }

  createProduct(data: Partial<ProductModel | FormData>){
    return this.http.post<ProductModel>(`${environment.apiUrl}/api/v1/products`, data);
  }

  updateProduct(id: number, data: Partial<ProductModel>){
    return this.http.put<ProductModel>(`${environment.apiUrl}/api/v1/products/${id}`, data);
  }
}
