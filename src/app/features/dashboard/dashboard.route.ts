import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then(m => m.HOME_ROUTES)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.route').then(m => m.CATEGORY_ROUTES)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.route').then(m => m.PRODUCT_ROUTES)
  }
]
