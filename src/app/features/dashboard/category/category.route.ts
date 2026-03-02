import { Routes } from '@angular/router';

export const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/category').then(m => m.Category)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./component/category-container/category-container').then(m => m.CategoryContainer)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/category-container/category-container').then(m => m.CategoryContainer)
  }
];
