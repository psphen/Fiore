import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductModel } from '../../../../../../models/product.model';
import { ProductService } from '../../../../../../services/product/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductForm } from "../../component/product-form/product-form";

@Component({
  selector: 'app-product-container',
  imports: [ProductForm],
  templateUrl: './product-container.html',
  styleUrl: './product-container.css',
})
export class ProductContainer implements OnInit {
  protected readonly productModel = signal<ProductModel | null>(null);

  private productService = inject(ProductService);
  private activeRoute = inject(ActivatedRoute);
  private route = inject(Router);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if(id){
        this.getProduct(id);
      }
    });
  }

  protected createProduct(data: Partial<ProductModel>){
    this.productService.createProduct(data).subscribe({
      next: () => {
        this.route.navigate(['product'])
      }
    });
  }

  protected updateProduct(data: Partial<ProductModel>){
    const product = this.productModel();
    if(product && product.id){
      this.productService.updateProduct(product?.id, data).subscribe({
        next: () => {
          this.route.navigate(['product']);
        }
      })
    }
  }

  protected getProduct(id: number){
    this.productService.getProduct(id).subscribe({
      next: (resp) => {
        this.productModel.set(resp);
      }
    });
  }
}
