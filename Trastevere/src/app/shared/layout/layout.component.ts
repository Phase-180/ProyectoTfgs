import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgIf } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ButtonModule, TabMenuModule, NgIf, ChipModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  constructor() {}
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Nuestra Casa', icon: 'pi pi-home', routerLink: 'nuestracasa' },
      {
        label: 'Disponibilidad',
        icon: 'pi pi-calendar',
        routerLink: 'calendario',
      },
      { label: 'Contacto', icon: 'pi pi-phone', routerLink: 'contacto' },
      {
        label: 'Lugares de interes',
        icon: 'pi pi-directions',
        routerLink: 'interes',
      },
    ];
  }

  isLogin() {
    if (this.authService.user === null) return true;
    return false;
  }

  isName(): string {
    return this.authService.user.name;
  }

  logout() {
    this.authService.logout();
  }
}
