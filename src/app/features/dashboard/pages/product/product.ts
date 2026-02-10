import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductService } from '../../../../services/product/product.service';
import { ProductModel } from '../../../../models/product.model';
import { ProductPersonal } from "./component/product-personal/product-personal";

@Component({
  selector: 'app-product',
  imports: [RouterLink, ProductPersonal],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  protected readonly products = signal<ProductModel[]>([]);
  protected readonly showDetail = signal<boolean>(false);
  protected readonly selectedProduct = signal<ProductModel | null>(null);

  private productService = inject(ProductService);
  protected limit = 10;
  protected offset = 0;

  ngOnInit(): void {
    this.loadProducts(10, 0);
  }

  private loadProducts(limit?: number, offset?: number){
    this.productService.getAll(limit, offset).subscribe({
      next: (products) => {
        this.products.set(products);
        this.offset += this.limit;
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  onToggleDetail(product: ProductModel){
    this.showDetail.set(true);
    this.selectedProduct.set(product);
  }

  closeDetail(){
    this.showDetail.set(false);
    this.selectedProduct.set(null);
  }

  protected deleteProduct(id: number){
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts(this.limit, this.offset);
        },
      });
    }
  }
}
