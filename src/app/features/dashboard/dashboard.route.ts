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
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.route').then(m => m.INVENTORY_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.route').then(m => m.ORDERS_ROUTES)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.route').then(m => m.USERS_ROUTES)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.route').then(m => m.STATISTICS_ROUTES)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.route').then(m => m.CALENDAR_ROUTES)
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers.route').then(m => m.SUPPLIERS_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.route').then(m => m.PROFILE_ROUTES)
  }
]
