import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';
import { TarifasComponent } from '../tarifas/tarifas.component';
import { ListaUsuarioComponent } from '../lista-usuario/lista-usuario.component';
export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'reservas',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../../components/list-reservas/list-reservas.component').then(
            (m) => m.ListReservasComponent
          ),
      },
      {
        path: 'datosPersonales',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../datos-personales/datos-personales.component').then(
            (m) => m.DatosPersonalesComponent
          ),
      },
      {
        path: 'listaUsuarios',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../lista-usuario/lista-usuario.component').then(
            (m) => m.ListaUsuarioComponent
          ),
      },
      {
        path: 'tarifas',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../tarifas/tarifas.component').then(
            (m) => m.TarifasComponent
          ),
      },
      {
        path: 'nuevaReserva',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../nueva-reserva/nueva-reserva.component').then(
            (m) => m.NuevaReservaComponent
          ),
      },
    ],
  },
];
