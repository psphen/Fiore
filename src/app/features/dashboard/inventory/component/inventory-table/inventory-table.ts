import { Component, input, output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryProduct } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-table',
  imports: [FormsModule],
  templateUrl: './inventory-table.html',
  styleUrl: './inventory-table.css',
})
export class InventoryTable {
  readonly products = input.required<InventoryProduct[]>();
  readonly productClicked = output<InventoryProduct>();

  protected searchQuery = signal('');
  protected selectedCategory = signal<string>('all');
  protected selectedStatus = signal<string>('all');
  protected sortBy = signal<string>('title');
  protected sortOrder = signal<'asc' | 'desc'>('asc');

  protected readonly categories = computed(() => {
    const cats = new Set(this.products().map(p => p.category));
    return ['all', ...Array.from(cats).sort()];
  });

  protected readonly filteredProducts = computed(() => {
    let result = [...this.products()];

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    const category = this.selectedCategory();
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    const status = this.selectedStatus();
    if (status !== 'all') {
      result = result.filter(p => p.status === status);
    }

    const sortKey = this.sortBy() as keyof InventoryProduct;
    const order = this.sortOrder();
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }

  onSort(column: string) {
    if (this.sortBy() === column) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(column);
      this.sortOrder.set('asc');
    }
  }

  onProductClick(product: InventoryProduct) {
    this.productClicked.emit(product);
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Activo',
      low_stock: 'Stock Bajo',
      out_of_stock: 'Sin Stock',
    };
    return labels[status] || status;
  }
}