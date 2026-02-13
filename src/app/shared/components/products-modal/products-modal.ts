import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../models/product.model';

export interface ProductsModalData {
  products: Product[];
  categoryName: string;
}

@Component({
  selector: 'app-products-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './products-modal.html',
  styleUrl: './products-modal.css',
})
export class ProductsModal {
  readonly dialogRef = inject(MatDialogRef<ProductsModal>);
  readonly data = inject<ProductsModalData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
