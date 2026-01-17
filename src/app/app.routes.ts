import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/layout/content/content').then(m => m.Content),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./features/dashboard/pages/home/home').then(m => m.Home)
      },
      {
        path: 'category',
        loadComponent: () => import('./features/dashboard/pages/category/category').then(m => m.Category)
      },
      {
        path: 'category/create',
        loadComponent: () => import('./features/dashboard/pages/category/containers/category-container/category-container').then(m => m.CategoryContainer)
      },
      {
        path: 'category/edit/:id',
        loadComponent: () => import('./features/dashboard/pages/category/containers/category-container/category-container').then(m => m.CategoryContainer)
      },
      {
        path: 'product',
        loadComponent: () => import('./features/dashboard/pages/product/product').then(m => m.Product)
      },
      {
        path: 'product/create',
        loadComponent: () => import('./features/dashboard/pages/product/container/product-container/product-container').then(m => m.ProductContainer)
      },
      {
        path: 'product/edit/:id',
        loadComponent: () => import('./features/dashboard/pages/product/container/product-container/product-container').then(m => m.ProductContainer)
      },
      {
        path: 'forms',
        loadComponent: () => import('./features/dashboard/pages/forms-reactive/forms-reactive').then(m => m.FormsReactive)
      }
    ]
  }
];
