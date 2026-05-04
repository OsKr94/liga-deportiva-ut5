import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Jugador {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  dorsal: number;
  club_id: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private apiUrl = `${environment.apiUrl}/jugadores`;

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }

  
  addJugador(data: Omit<Jugador, 'id' | 'created_at' | 'updated_at'>): Observable<Jugador> {
    return this.http.post<Jugador>(this.apiUrl, data);
  }

  deleteJugador(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.apiUrl}/${id}`);
  }
}