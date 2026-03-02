import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly platformId = inject(PLATFORM_ID);
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  saveToken(token: string): void {
    if (this.isBrowser) localStorage.setItem(environment.auth.tokenKey, token);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(environment.auth.tokenKey) : null;
  }

  saveRefreshToken(token: string): void {
    if (this.isBrowser) localStorage.setItem(environment.auth.refreshTokenKey, token);
  }

  getRefreshToken(): string | null {
    return this.isBrowser ? localStorage.getItem(environment.auth.refreshTokenKey) : null;
  }

  clearTokens(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(environment.auth.tokenKey);
    localStorage.removeItem(environment.auth.refreshTokenKey);
    localStorage.removeItem(environment.auth.userKey);
  }
}
