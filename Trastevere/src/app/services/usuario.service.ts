import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../core/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private readonly http: HttpClient) {}

  getAllUsers() {
    return this.http.get<IUser[]>(this.ip + '/getAllUsers');
  }

  private get ip() {
    return environment.URL_API + 'login';
  }
}
