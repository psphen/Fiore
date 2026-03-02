import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Login, LoginResponse } from './auth.model';
import { User } from '../../../features/dashboard/users/model/users.model';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrl = `${environment.apiUrl}/api/v1/auth`;

  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public readonly currentUser$ = this.currentUserSubject.asObservable();
  public readonly isAuthenticated = signal(this.hasValidToken());

  login(data: Login) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(resp => {
        this.tokenService.saveToken(resp.access_token);
        this.tokenService.saveRefreshToken(resp.refresh_token);
        this.isAuthenticated.set(true);
      }),
      switchMap(resp => {
        return this.profile().pipe(
          tap(userInfo => {
            this.saveUserData(userInfo);
          }),
          map(() => resp)
        );
      })
    );
  }

  profile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  logout(): void {
    this.tokenService.clearTokens();
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  private saveUserData(userInfo: User): void {
    const authUser: User = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      role: userInfo.role,
      avatar: userInfo.avatar,
      password: '',
    };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(environment.auth.userKey, JSON.stringify(authUser));
    }
    this.currentUserSubject.next(authUser);
  }

  private hasValidToken(): boolean {
    return !!this.tokenService.getToken();
  }

  private getUserFromStorage(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const userJson = localStorage.getItem(environment.auth.userKey);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }
}
