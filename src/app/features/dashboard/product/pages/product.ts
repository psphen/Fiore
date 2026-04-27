import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faPencil, faTrash, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../api/product.service';
import { Product as ProductModel } from '../models/product.model';
import { ProductPersonal } from "../component/product-personal/product-personal";

@Component({
  selector: 'app-product',
  imports: [RouterLink, FormsModule, DecimalPipe, FaIconComponent, ProductPersonal],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  protected readonly products = signal<ProductModel[]>([]);
  protected readonly filteredProducts = signal<ProductModel[]>([]);
  protected readonly showDetail = signal<boolean>(false);
  protected readonly selectedProduct = signal<ProductModel | null>(null);
  protected readonly searchTerm = signal<string>('');

  faPlus = faPlus;
  faSearch = faSearch;
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;
  faFilter = faFilter;

  private productService = inject(ProductService);
  protected limit = 10;
  protected offset = 0;

  ngOnInit(): void {
    this.loadProducts(10, 0);
  }

  private loadProducts(limit?: number, offset?: number){
    this.productService.get().subscribe({
      next: (products) => {
        this.products.set(products);
        this.applyFilter();
        this.offset += this.limit;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      }
    })
  }

  protected onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.applyFilter();
  }

  private applyFilter() {
    const term = this.searchTerm().toLowerCase();
    const allProducts = this.products();
    
    if (!term) {
      this.filteredProducts.set([...allProducts]);
      return;
    }

    const filtered = allProducts.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      p.category.name.toLowerCase().includes(term)
    );
    this.filteredProducts.set(filtered);
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
