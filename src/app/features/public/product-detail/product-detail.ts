import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from './../../dashboard/product/models/product.model';
import { ProductService } from './../../dashboard/product/api/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  protected productId = signal<number | null>(null);
  protected product = signal<Product | null>(null);

  private router = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private location = inject(Location)

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.productId.set(id ? Number(id) : null);
          if(this.productId()){
            return this.productService.getById(this.productId()!);
          }
          return [null];
        })
      )
      .subscribe({
        next: (resp) => {
          this.product.set(resp);
        }
      })
  }

  protected goToBack() {
    this.location.back();
  }
}
