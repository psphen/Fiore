import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/pages/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/dashboard/pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/dashboard/pages/register/register').then(m => m.Register)
  },
  {
    path: 'my-cart',
    loadComponent: () => import('./features/dashboard/pages/my-cart/my-cart').then(m => m.MyCart)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/dashboard/pages/product-detail/product-detail').then(m => m.ProductDetail)
  },

  // Dashboard administrativo
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/layout/content/content').then(m => m.Content),
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
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
  },
  // Página 404 (sin layout)
  {
    path: '**',
    loadComponent: () => import('./features/dashboard/pages/not-found/not-found').then(m => m.NotFound)
  }
];
