import { Routes } from '@angular/router';
import { ListUser } from './pages/list-user/list-user';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: ListUser,
  },
];