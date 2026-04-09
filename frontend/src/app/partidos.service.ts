// src/app/partidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

export interface Partido {
  id?: number;
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

export interface ClubOption {
  id: number;
  nombre: string;
}

export interface LigaOption {
  id: number;
  nombre: string;
  temporada: string;
}

interface PartidoCreacionPayload {
  liga_id: number;
  club_local_id: number;
  club_visitante_id: number;
  fecha: string;
  resultado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

 private apiUrl = `${environment.apiUrl}/partidos`;
 private clubsUrl = `${environment.apiUrl}/clubs`;
 private ligasUrl = `${environment.apiUrl}/ligas`;

  constructor(private http: HttpClient) {}

  // Obtener TODOS los partidos (admin)
  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[] | { partidos?: Partido[] }>(this.apiUrl)
      .pipe(
        map((resp) => Array.isArray(resp) ? resp : (resp.partidos ?? []))
      );
  }

  getClubs(): Observable<ClubOption[]> {
    return this.http.get<ClubOption[]>(this.clubsUrl);
  }

  getLigas(): Observable<LigaOption[]> {
    return this.http.get<LigaOption[]>(this.ligasUrl);
  }

  // Obtener partidos de un árbitro
  getPartidosArbitro(usuario: string): Observable<Partido[]> {
    return this.http.get<{ partidos: Partido[] }>(`${this.apiUrl}/arbitro/${usuario}`)
      .pipe(map(resp => resp.partidos));
  }

  // Obtener partidos de un equipo (local o visitante)
  getPartidosEquipo(nombreEquipo: string): Observable<Partido[]> {
    return this.http.get<{ partidos: Partido[] }>(`${this.apiUrl}/equipo/${nombreEquipo}`)
      .pipe(map(resp => resp.partidos));
  }

  // Crear partido nuevo (admin)
  crearPartido(data: PartidoCreacionPayload): Observable<any> {
    const headers = localStorage.getItem('tipoUsuario') === 'admin'
      ? new HttpHeaders({ 'X-ROLE': 'admin' })
      : undefined;

    return this.http.post(this.apiUrl, data, headers ? { headers } : {});
  }
}
