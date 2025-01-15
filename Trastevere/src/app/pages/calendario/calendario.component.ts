import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../services/reservas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CalendarModule, FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent {
   private readonly reservasService: ReservasService = inject(ReservasService);
   private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
 
   minDate: Date = new Date();
   allDates: { [key: string]: boolean } = {};
   isAllData: boolean = false;
   reserva = {
     dates: [],
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
   }
 






  isReservedDate(date: any): boolean {
    return this.allDates[`${date.year}-${date.month + 1}-${date.day}`]
      ? true
      : false;
  }

}
