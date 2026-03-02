import { Component } from '@angular/core';

interface TrendingProduct {
  image: string;
  name: string;
  stock: number;
  price: string;
  sales: number;
  earnings: string;
}

@Component({
  selector: 'app-trending-products',
  imports: [],
  templateUrl: './trending-products.html',
  styleUrl: './trending-products.css',
})
export class TrendingProducts {
  protected readonly products: TrendingProduct[] = [
    { image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=80&h=80&fit=crop', name: 'Ramo rosas amarillas', stock: 4, price: '$50.000', sales: 4, earnings: '$200.000' },
    { image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=80&h=80&fit=crop', name: 'Ramo cerdito rosa', stock: 1, price: '$80.000', sales: 8, earnings: '$640.000' },
    { image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc42?w=80&h=80&fit=crop', name: 'Ramo girasol y rosas', stock: 4, price: '$45.000', sales: 6, earnings: '$270.000' },
    { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop', name: 'Ramo ojo turco', stock: 1, price: '$120.000', sales: 5, earnings: '$600.000' },
  ];
}
