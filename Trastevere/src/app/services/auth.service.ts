import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: any = null;
  private _name: string = '';
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.ip}`, { email, password }).pipe(
      tap((e) => {
        this._user = e;
      })
    );
  }

  register(
    name: string,
    surname: string,
    address: string,
    email: string,
    cif: string,
    phone: string,
    bornDate: string,
    password: string
  ) {
    return this.http
      .post(`${this.ip}/register`, {
        name,
        surname,
        address,
        email,
        cif,
        phone,
        bornDate,
        password,
      })
      .pipe(
        tap((e) => {
          this._user = e;
        })
      );
  }

  renewToken() {
    return this.http.get(`${this.ip}/renew-token`).pipe(
      map((e) => {
        this._user = e;
        return true;
      }),
      catchError((e) => {
        return e;
      })
    );
  }

  get user() {
    return this._user;
  }

  get name(): string {
    this._name = this.user().name;
    return this._name;
  }

  logout() {
    this._user = null; // Limpia la variable de usuario en memoria
    localStorage.removeItem('token');
  }

  get isAdmin() {
    return this._user.role.toUpperCase() === 'ADMIN';
  }

  private get ip() {
    return environment.URL_API + 'login';
  }
}
