import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-view/home-view').then(m => m.HomeView)
  }
];
