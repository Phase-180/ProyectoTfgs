import { Routes } from '@angular/router';
import { PAGES_ROUTES } from './pages/routing.router';
import { AUTH_ROUTES } from './auth/auth.router';
import { HOME_ROUTES } from '../app/pages/home/home.router';

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...PAGES_ROUTES,
  ...HOME_ROUTES,
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found404/not-found404.component').then(
        (m) => m.NotFound404Component
      ),
    pathMatch: 'full',
  },
];
