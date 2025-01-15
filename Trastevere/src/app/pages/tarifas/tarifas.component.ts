import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { TarifaService } from '../../services/tarifa.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ITarifaDays } from '../../core/tarifas.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
interface Tarifa {
  descripcion: string;
  id: number;
  pri: number;
  iva: number;
}
@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DatePipe,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class TarifasComponent {
  tarifas: ITarifaDays[] = [];
  private readonly tarifasService: TarifaService = inject(TarifaService);
  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly messageService: MessageService = inject(MessageService);

  constructor() {
    this.tarifasService.getAllTarifas().subscribe((data) => {
      this.tarifas = data;
      this.cd.detectChanges();
    });
  }
  onPriceChange(tarifa: ITarifaDays) {
    this.tarifasService.updateTarifa(tarifa).subscribe({
      next: (data) => {
        console.log('data', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Tarifa actualizada',
          detail: 'La tarifa ha sido actualizada correctamente',
        });
      },
      error: () => {},
      complete: () => {},
    });
  }
}
