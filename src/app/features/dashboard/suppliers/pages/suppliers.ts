import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch, faTruck, faEnvelope, faPhone, faMapMarkerAlt, faStar, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Supplier, MOCK_SUPPLIERS } from '../models/suppliers.model';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers implements OnInit {
  faSearch = faSearch;
  faTruck = faTruck;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faStar = faStar;
  faEdit = faEdit;
  faTimes = faTimes;

  protected readonly suppliers = signal<Supplier[]>(MOCK_SUPPLIERS);
  
  protected searchQuery = signal('');
  protected selectedCategory = signal<string>('all');
  protected selectedSupplier = signal<Supplier | null>(null);

  protected readonly filteredSuppliers = computed(() => {
    let result = [...this.suppliers()];

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(
        s => s.name.toLowerCase().includes(query) || 
            s.contact.toLowerCase().includes(query)
      );
    }

    const category = this.selectedCategory();
    if (category !== 'all') {
      result = result.filter(s => s.category === category);
    }

    return result;
  });

  protected readonly categories = computed(() => {
    const cats = new Set(this.suppliers().map(s => s.category));
    return ['all', ...Array.from(cats).sort()];
  });

  protected readonly stats = computed(() => {
    const suppliers = this.suppliers();
    return {
      total: suppliers.length,
      active: suppliers.filter(s => s.status === 'active').length,
      avgRating: (suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length).toFixed(1),
    };
  });

  ngOnInit(): void {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }

  onSupplierClick(supplier: Supplier) {
    this.selectedSupplier.set(supplier);
  }

  closeDetail() {
    this.selectedSupplier.set(null);
  }

  getStatusClass(status: string): string {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  }
}