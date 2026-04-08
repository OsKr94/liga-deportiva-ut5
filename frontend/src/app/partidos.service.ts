// src/app/partidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

export interface Partido {
  _id?: string;
  deporte: string;
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  ubicacion: string;
  arbitro: string;
  resultado: {
    golesLocal: number;
    golesVisitante: number;
  };
  estado: string;
}

interface RespuestaPartidos {
  ok: boolean;
  partidos: Partido[];
}

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

 private apiUrl = `${environment.apiUrl}/partidos`;

  constructor(private http: HttpClient) {}

  // Obtener TODOS los partidos (admin)
  getPartidos(): Observable<Partido[]> {
    return this.http.get<RespuestaPartidos>(this.apiUrl)
      .pipe(map(resp => resp.partidos));
  }

  // Obtener partidos de un árbitro
  getPartidosArbitro(usuario: string): Observable<Partido[]> {
    return this.http.get<RespuestaPartidos>(`${this.apiUrl}/arbitro/${usuario}`)
      .pipe(map(resp => resp.partidos));
  }

  // Obtener partidos de un equipo (local o visitante)
  getPartidosEquipo(nombreEquipo: string): Observable<Partido[]> {
    return this.http.get<RespuestaPartidos>(`${this.apiUrl}/equipo/${nombreEquipo}`)
      .pipe(map(resp => resp.partidos));
  }

  // Crear partido nuevo (admin)
  crearPartido(data: Partido): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
