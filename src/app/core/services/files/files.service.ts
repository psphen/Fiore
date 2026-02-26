import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { saveAs } from 'file-saver'
import { environment } from '../../../../environments/environment';

interface File {
  originalname: string,
  filename: string,
  location: string
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/files`

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }
}
