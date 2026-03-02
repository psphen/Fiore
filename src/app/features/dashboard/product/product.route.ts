import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product').then(m => m.Product)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./component/product-container/product-container').then(m => m.ProductContainer)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/product-container/product-container').then(m => m.ProductContainer)
  }
];
