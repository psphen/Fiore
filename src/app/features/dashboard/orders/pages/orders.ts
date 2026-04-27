import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch, faFilter, faEye, faShoppingBag, faClock, faTruck, faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Order,
  MOCK_ORDERS,
  getOrdersSummary,
  OrdersSummary,
} from '../models/orders.model';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  faSearch = faSearch;
  faFilter = faFilter;
  faEye = faEye;
  faShoppingBag = faShoppingBag;
  faClock = faClock;
  faTruck = faTruck;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faTimes = faTimes;

  protected readonly orders = signal<Order[]>(MOCK_ORDERS);
  protected readonly summary = computed<OrdersSummary>(() =>
    getOrdersSummary(this.orders())
  );

  protected searchQuery = signal('');
  protected selectedStatus = signal<string>('all');
  protected selectedOrder = signal<Order | null>(null);

  protected readonly filteredOrders = computed(() => {
    let result = [...this.orders()];

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(
        o =>
          o.customerName.toLowerCase().includes(query) ||
          o.customerEmail.toLowerCase().includes(query) ||
          o.id.toString().includes(query)
      );
    }

    const status = this.selectedStatus();
    if (status !== 'all') {
      result = result.filter(o => o.status === status);
    }

    return result;
  });

  ngOnInit(): void {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }

  onOrderClick(order: Order) {
    this.selectedOrder.set(order);
  }

  closeDetail() {
    this.selectedOrder.set(null);
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  }
}