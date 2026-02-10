import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from '../../models/auth.model';
import { User } from '../../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/auth`;

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password });
  }

  profile(token: string){
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorizer: `Bearer ${token}`
      }
    });
  }
}
