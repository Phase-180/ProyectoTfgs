import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { IUser } from '../../core/user.interface';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaUsuarioComponent {
  private readonly userService: UsuarioService = inject(UsuarioService);
  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  isLoading: boolean = false;
  users: IUser[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
