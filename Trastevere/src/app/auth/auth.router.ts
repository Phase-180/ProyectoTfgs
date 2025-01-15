import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./register/register.component').then((mod) => mod.RegisterComponent),
  },
  {
    path: 'auth/recovery',
    loadComponent: () =>
      import('./recovery/recovery.component').then((mod) => mod.RecoveryComponent),
  },
];
