import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBox, faShoppingCart, faPlusCircle, faWarning, faExclamationTriangle, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { InventoryTable } from '../component/inventory-table/inventory-table';
import {
  InventoryProduct,
  MOCK_INVENTORY,
  getInventorySummary,
  InventorySummary,
} from '../models/inventory.model';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FaIconComponent, InventoryTable],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  faBox = faBox;
  faShoppingCart = faShoppingCart;
  faPlusCircle = faPlusCircle;
  faWarning = faWarning;
  faExclamationTriangle = faExclamationTriangle;
  faWarehouse = faWarehouse;

  protected readonly products = signal<InventoryProduct[]>(MOCK_INVENTORY);
  protected readonly summary = computed<InventorySummary>(() =>
    getInventorySummary(this.products())
  );

  protected readonly statsCards = computed(() => {
    const s = this.summary();
    return [
      {
        label: 'Total Productos',
        value: s.totalProducts,
        icon: 'inventory_2',
        color: 'blue',
      },
      {
        label: 'Total Vendidos',
        value: s.totalSold,
        icon: 'shopping_cart',
        color: 'green',
      },
      {
        label: 'Creados',
        value: s.totalCreated,
        icon: 'add_circle',
        color: 'purple',
      },
      {
        label: 'Stock Bajo',
        value: s.lowStock,
        icon: 'warning',
        color: 'yellow',
      },
      {
        label: 'Sin Stock',
        value: s.outOfStock,
        icon: 'error',
        color: 'red',
      },
    ];
  });

  ngOnInit(): void {}

  onProductClick(product: InventoryProduct) {
    console.log('Product clicked:', product);
  }
}