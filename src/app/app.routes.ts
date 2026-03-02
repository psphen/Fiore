import { Routes, PreloadAllModules } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { exitGuard } from './core/guards/exit-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home').then(m => m.Home)
  },


  {
    path: 'login',
    loadComponent: () => import('./layouts/app-auth-shell/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    canDeactivate: [exitGuard],
    loadComponent: () => import('./features/public/register/register').then(m => m.Register),
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
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-shell/app.shell').then(m => m.AppShell),
    loadChildren: () => import('./features/dashboard/dashboard.route').then(m => m.DASHBOARD_ROUTES)
  },

  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found').then(m => m.NotFound)
  }
];
