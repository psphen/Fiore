import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CreateUserDTO, UpdateUserDTO, User } from './../model/users.model';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/users`;

  get(){
    return this.http.get<User[]>(this.apiUrl)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => 'Yuca no funciona');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(() => 'Nooo papi no tienes permiso My sog');
        }
        return throwError(() => 'No mi broqui, ni idea que sea');
      })
    );
  }

  getById(id: number){
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateUserDTO){
    return this.http.put<User>(`${this.apiUrl}/${id}`, dto);
  }
}
