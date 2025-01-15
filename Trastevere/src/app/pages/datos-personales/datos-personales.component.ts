import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosPersonalesComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  usuario: any = null;

  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.usuario.dateBorn = new Date(this.usuario.dateBorn);
  }
}
