import { Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/public/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/public/register/register').then(m => m.Register)
  },
  {
    path: 'my-cart',
    loadComponent: () => import('./features/public/my-cart/my-cart').then(m => m.MyCart)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/public/product-detail/product-detail').then(m => m.ProductDetail)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./layouts/app-shell/content/content').then(m => m.Content),
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./features/dashboard/home/hone.route').then(m => m.HOME_ROUTES)
      },
      {
        path: 'category',
        loadComponent: () => import('./features/dashboard/category/pages/category').then(m => m.Category)
      },
      {
        path: 'category/create',
        loadComponent: () => import('./features/dashboard/category/component/category-container/category-container').then(m => m.CategoryContainer)
      },
      {
        path: 'category/edit/:id',
        loadComponent: () => import('./features/dashboard/category/component/category-container/category-container').then(m => m.CategoryContainer)
      },
      {
        path: 'product',
        loadComponent: () => import('./features/dashboard/product/pages/product').then(m => m.Product)
      },
      {
        path: 'product/create',
        loadComponent: () => import('./features/dashboard/product/component/product-container/product-container').then(m => m.ProductContainer)
      },
      {
        path: 'product/edit/:id',
        loadComponent: () => import('./features/dashboard/product/component/product-container/product-container').then(m => m.ProductContainer)
      }
    ]
  },

  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found').then(m => m.NotFound)
  }
];
