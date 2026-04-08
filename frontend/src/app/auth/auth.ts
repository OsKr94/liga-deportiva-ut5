import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface LoginRespuesta {
  ok: boolean;
  mensaje: string;
  tipo?: 'admin' | 'normal' | 'arbitro' | 'capitan';
}

export interface RegistroRespuesta {
  ok: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(datos: { usuario: string; password: string }) {
    return this.http.post<LoginRespuesta>(`${this.apiUrl}/login`, datos);
  }

  registro(datos: {
    nombre: string;
    usuario: string;
    email: string;
    password: string;
    tipo: string;
  }) {
    return this.http.post<RegistroRespuesta>(`${this.apiUrl}/registro`, datos);
  }
}
