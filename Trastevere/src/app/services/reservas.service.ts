import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import dayjs from 'dayjs';
@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private _reserva: any[] = []; // Ajusta el tipo de datos según tu modelo

  constructor(private http: HttpClient) {}

  reservasByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ip}`).pipe(
      tap((reservas) => {
        this._reserva = reservas; // Guarda las reservas en la variable
      })
    );
  }
  allReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ip}allReservas`).pipe(
      tap((reservas) => {
        this._reserva = reservas; // Guarda las reservas en la variable
      })
    );
  }

  getAllReservas() {
    return this.http.get<{ [key: string]: boolean }>(
      `${this.ip}allReservesDates`
    );
  }

  getPrice(huespedes: number, dates: Date[]) {
    return this.http.post<number>(`${this.ip}price/${huespedes}`, {
      fechaInicio: dayjs(dates[0]).format('YYYY-MM-DD'),
      fechaSalida: dayjs(dates[1]).format('YYYY-MM-DD'),
    });
  }

  createReserva(reserva: {
    dates: Date[];
    numHuespedes: number;
  }): Observable<any> {
    return this.http
      .post(`${this.ip}`, {
        fechaInicio: this.getDate(reserva.dates[0]),
        fechaSalida: this.getDate(reserva.dates[1]),
        numHuespedes: reserva.numHuespedes,
      })
      .pipe(tap((reservas) => {}));
  }

  private getDate(date: Date) {
    const adjustedDate = new Date(
      date.getTime() + date.getTimezoneOffset() * -1 * 60000
    );
    return adjustedDate.toISOString().split('T')[0];
  }

  deleteReserva(reserva: any): Observable<any> {
    return this.http.delete(`${this.ip}${reserva.id}`);
  }

  deleteReservaAdmin(reserva: any): Observable<any> {
    return this.http.delete(`${this.ip}${"admin/"+reserva.id}`);
  }
  // Método para acceder a las reservas almacenadas localmente
  getReservasLocal(): any[] {
    return this._reserva;
  }

  private get ip() {
    return environment.URL_API + 'reserva/';
  }
}
