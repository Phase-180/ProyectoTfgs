import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ReservasService } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { TarifaService } from '../../services/tarifa.service';
import { Observable } from 'rxjs';

interface Tarifa {
  descripcion: string;
  id: number;
  pri: number;
  iva: number;
}

@Component({
  selector: 'app-nueva-reserva',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, InputNumberModule],
  templateUrl: './nueva-reserva.component.html',
  styleUrl: './nueva-reserva.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevaReservaComponent {
  tarifas: any[] = [];
  private readonly reservasService: ReservasService = inject(ReservasService);
  private readonly tarifasService: TarifaService = inject(TarifaService);
  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly router: Router = inject(Router);
  minDate: Date = new Date();
  allDates: { [key: string]: boolean } = {};
  isAllData: boolean = false;
  reserva = {
    dates: [],
    priceTotal: 0,
    numHuespedes: 0,
  };
  constructor() {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.reservasService.getAllReservas().subscribe({
      next: (data) => {
        this.allDates = data;
        this.isAllData = true;
        this.cd.detectChanges();
      },
      error: () => {},
      complete: () => {},
    });
    this.tarifasService.getAllTarifas().subscribe((data) => {
      this.tarifas = data;
      this.cd.detectChanges();
    });
  }

  isReservedDate(date: any): boolean {
    return this.allDates[`${date.year}-${date.month + 1}-${date.day}`]
      ? true
      : false;
  }

  reservar() {
    this.reservasService.createReserva(this.reserva).subscribe({
      next: (data) => {
        this.router.navigate(['/home/reservas']);
      },
      error: () => {},
      complete: () => {},
    });
  }

  priceTotal() {
    this.reservasService
      .getPrice(this.reserva.numHuespedes, this.reserva.dates)
      .subscribe({
        next: (data) => {
          this.reserva.priceTotal = data;
          this.cd.detectChanges();
        },
        error: () => {},
        complete: () => {},
      });
  }
}
