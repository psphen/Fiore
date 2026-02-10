import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/products`;

  get(){
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(
      retry(3),
      map(product => product.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getById(id: number){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => 'El servidor no funciona');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(() => 'No estas autorizado mi sog');
        }
        return throwError(() => 'Ni focking idea');
      })
    )
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
