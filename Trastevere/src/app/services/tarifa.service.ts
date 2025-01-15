import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ITarifaDays } from '../core/tarifas.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarifaService {
  private _tarifa: any[] = []; // Ajusta el tipo de datos según tu modelo

  constructor(private http: HttpClient) {}

  getAllTarifas() {
    return this.http.get<ITarifaDays[]>(`${this.ip}allTarifas`);
  }

  updateTarifa({ TarifaDays, id, ...tarifa }: ITarifaDays) {
    return this.http.patch(`${this.ip}${id}`, tarifa);
  }

  private get ip() {
    return environment.URL_API + 'tarifa/';
  }
}
