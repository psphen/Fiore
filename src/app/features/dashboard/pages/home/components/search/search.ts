import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, pipe } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  protected searchForm = new FormControl;
  protected gifAny = signal<any>([]);

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.searchForm.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe({
      next: (resp) => {
        this.getGif(resp);
      }
    })
  }

  private getGif(query: string){
    const api = 'przSMpbFjNtoQGrvVYeXgBWn5BZHQpYh&q'
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${api}=${query}&limit=25`)
    .pipe(
      map((resp: any) => {
        return resp.data.map((i: any) => i.images.original);
      })
    )
    .subscribe({
      next: (resp) => {
        this.gifAny.set(resp);
      }
    })
  }
}
