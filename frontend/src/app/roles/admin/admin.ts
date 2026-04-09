// src/app/roles/admin/admin.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidosService, Partido, ClubOption, LigaOption } from '../../partidos.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  partidos: Partido[] = [];
  clubs: ClubOption[] = [];
  ligas: LigaOption[] = [];

  nuevoPartido = {
    ligaId: null as number | null,
    clubLocalId: null as number | null,
    clubVisitanteId: null as number | null,
    fecha: '',
    golesLocal: 0,
    golesVisitante: 0
  };

  cargando = false;
  mensaje = '';

  constructor(
    private partidosService: PartidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarPartidos();
  }

  cargarCatalogos(): void {
    this.partidosService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs;

        if (!this.nuevoPartido.clubLocalId && clubs.length > 0) {
          this.nuevoPartido.clubLocalId = clubs[0].id;
        }

        if (!this.nuevoPartido.clubVisitanteId && clubs.length > 1) {
          this.nuevoPartido.clubVisitanteId = clubs[1].id;
        }
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar los clubes.';
      }
    });

    this.partidosService.getLigas().subscribe({
      next: (ligas) => {
        this.ligas = ligas;

        if (!this.nuevoPartido.ligaId && ligas.length > 0) {
          this.nuevoPartido.ligaId = ligas[0].id;
        }
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar las ligas.';
      }
    });
  }

  cargarPartidos(): void {
    this.cargando = true;
    this.mensaje = '';

    this.partidosService.getPartidos().subscribe({
      next: (lista) => {
        this.partidos = lista;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar partidos', err);
        this.mensaje = 'Error al cargar los partidos desde el servidor.';
        this.cargando = false;
      }
    });
  }

  crearPartido(): void {
    if (!this.nuevoPartido.ligaId || !this.nuevoPartido.clubLocalId || !this.nuevoPartido.clubVisitanteId) {
      this.mensaje = 'Selecciona liga y clubes para crear el partido.';
      return;
    }

    if (this.nuevoPartido.clubLocalId === this.nuevoPartido.clubVisitanteId) {
      this.mensaje = 'El club local y el visitante no pueden ser el mismo.';
      return;
    }

    this.mensaje = '';
    this.cargando = true;

    const partido = {
      liga_id: this.nuevoPartido.ligaId,
      club_local_id: this.nuevoPartido.clubLocalId,
      club_visitante_id: this.nuevoPartido.clubVisitanteId,
      fecha: this.nuevoPartido.fecha,
      resultado: `${this.nuevoPartido.golesLocal}-${this.nuevoPartido.golesVisitante}`,
    };

    this.partidosService.crearPartido(partido).subscribe({
      next: (resp) => {
        console.log('Partido creado:', resp);
        this.mensaje = 'Partido creado correctamente.';
        this.cargarPartidos();
        this.nuevoPartido.fecha = '';
        this.nuevoPartido.golesLocal = 0;
        this.nuevoPartido.golesVisitante = 0;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error creando partido', err);
        this.mensaje = err?.error?.mensaje || err?.error?.message || 'Error al crear el partido.';
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
