import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestServices {
  protected readonly http = inject(HttpClient);
  protected readonly apiUrl = `${environment.apiUrl}/weatherforecast`;

  all(){
    return this.http.get(this.apiUrl);
  }
}
