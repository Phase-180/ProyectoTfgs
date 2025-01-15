import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-list-reservas',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    TagModule,
    ToastModule,
  ],
  templateUrl: './list-reservas.component.html',
  styleUrl: './list-reservas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class ListReservasComponent {
  constructor(
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}
  private readonly reservaService: ReservasService = inject(ReservasService);
  readonly authService: AuthService = inject(AuthService);

  reservas: any[] = [];
  isLoading: boolean = true; // Nueva variable para el estado de carga

  ngOnInit(): void {
    const actionSubs = {
      next: (data: any) => {
        this.reservas = data;
        this.isLoading = false;

        this.cd.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.cd.detectChanges();
      },
    };

    if (this.authService.isAdmin) {
      this.reservaService.allReservas().subscribe(actionSubs);
    } else {
      this.reservaService.reservasByUser().subscribe(actionSubs);
    }
  }

  deleteReserva(reserva: any) {
    this.reservaService.deleteReserva(reserva).subscribe({
      next: (data) => {
        reserva.devolucion = true;
        this.showDevolucion();
        this.cd.detectChanges();
      },
      error: () => {
        this.showNotDeleted();
      },
      complete: () => {},
    });
  }

  deleteReservaAdmin(reserva: any) {
    this.reservaService.deleteReservaAdmin(reserva).subscribe({
      next: (data) => {
        reserva.deleted = true;
        this.show();
        this.cd.detectChanges();
      },
      error: () => {
        this.showNotDeleted();
      },
      complete: () => {},
    });
  }

  reservaDateUntilNow(reserva: any): boolean {
    let day: Date = new Date();
    if (new Date(reserva.fechaInicio) <= day) return true;

    return false;
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmada',
      detail: 'Reserva cancelada',
    });
  }

  showDevolucion() {
        this.messageService.add({  severity: 'warn', summary: 'Devolución', detail: 'La devolución se realizara en breve.' });

    
  }

  showNotDeleted() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Quedan menos de tres dias para la reserva.',
    });
  }

  
}
