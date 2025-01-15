import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  public usuario: any = this.authService.user;
  private userRole: String = this.usuario.role;
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      ...(this.userRole === 'ADMIN'
        ? [
            {
              separator: true,
            },
            {
              label: 'Administración',
              items: [
                {
                  label: 'Lista de Usuarios',
                  icon: 'pi pi-users',
                  routerLink: '/home/listaUsuarios',
                },
                {
                  label: 'Tarifas',
                  icon: 'pi pi-chart-line',
                  routerLink: '/home/tarifas',
                },
                {
                  label: 'Lista de Reservas',
                  icon: 'pi pi-search',
                  routerLink: '/home/reservas',
                },
              ],
            },
          ]
        : []),
      {
        separator: true,
      },
      ...(this.userRole === 'USER'
        ? [
            {
              label: 'Reservas',
              items: [
                {
                  label: 'Nueva Reserva',
                  icon: 'pi pi-plus',
                  routerLink: '/home/nuevaReserva',
                },
                {
                  label: 'Lista de Reservas',
                  icon: 'pi pi-search',
                  routerLink: '/home/reservas',
                },
              ],
            },
            {
              separator: true,
            },
          ]
        : []),

      {
        label: 'Perfil',
        items: [
          {
            label: 'Datos',
            icon: 'pi pi-cog',
            routerLink: '/home/datosPersonales',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/nuestracasa']);
  }
}
