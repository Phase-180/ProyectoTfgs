import { Routes } from '@angular/router';
export const PAGES_ROUTES: Routes = [
  { path: '', redirectTo: 'nuestracasa', pathMatch: 'full' },

  {
    path: 'nuestracasa',
    loadComponent: () =>
      import('./nuestra-casa/nuestra-casa.component').then(
        (m) => m.NuestraCasaComponent
      ),
  },
  {
    path: 'calendario',
    loadComponent: () =>
      import('./calendario/calendario.component').then(
        (m) => m.CalendarioComponent
      ),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./contacto/contacto.component').then((m) => m.ContactoComponent),
  },
  {
    path: 'interes',
    loadComponent: () =>
      import('./interes/interes.component').then((m) => m.InteresComponent),
  },
];
