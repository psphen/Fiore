import { Component, inject, OnInit, signal } from '@angular/core';
import { CreateProductDTO, UpdateProductDTO, Product } from '../../../../../../models/product.model';
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
  protected productModel: Product | null = null;

  private productService = inject(ProductService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if(id){
        this.getProduct(id);
      }
    });
  }

  protected getProduct(id: number){
    this.productService.getById(id).subscribe({
      next: (resp) => {
        this.productModel = resp;
      }
    });
  }

  protected createProduct(data: CreateProductDTO){
    this.productService.create(data).subscribe({
      next: () => {
        this.router.navigate(['product']);
      },
      error: (er) => {
        alert(er);
      }
    });
  }

  protected updateProduct(data: UpdateProductDTO){
    if(!this.productModel?.id){
      alert('No se encontro nada');
      return
    }
    this.productService.update(this.productModel?.id, data).subscribe({
      next: () => {
        this.router.navigate(['product'])
      }
    })
  }
}
