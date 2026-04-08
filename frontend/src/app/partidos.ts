// src/app/partidos.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  private apiUrl = 'http://localhost:3000/api/partidos';

  constructor(private http: HttpClient) {}

  // Obtener TODOS los partidos
  getPartidos(): Observable<Partido[]> {
    return this.http.get<RespuestaPartidos>(this.apiUrl)
      .pipe(
        map(resp => resp.partidos)
      );
  }

  // Crear partido nuevo (lo usaremos luego)
  crearPartido(data: Partido): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
