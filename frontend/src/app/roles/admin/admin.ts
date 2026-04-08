// src/app/roles/admin/admin.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidosService, Partido } from '../../partidos.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  partidos: Partido[] = [];

  nuevoPartido = {
    deporte: 'futbol',
    equipoLocal: '',
    equipoVisitante: '',
    fecha: '',
    ubicacion: '',
    arbitro: '',
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
    this.cargarPartidos();
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
    this.mensaje = '';
    this.cargando = true;

    const partido: Partido = {
      deporte: this.nuevoPartido.deporte,
      equipoLocal: this.nuevoPartido.equipoLocal,
      equipoVisitante: this.nuevoPartido.equipoVisitante,
      fecha: this.nuevoPartido.fecha,
      ubicacion: this.nuevoPartido.ubicacion,
      arbitro: this.nuevoPartido.arbitro,
      resultado: {
        golesLocal: this.nuevoPartido.golesLocal,
        golesVisitante: this.nuevoPartido.golesVisitante
      },
      estado: 'pendiente'
    };

    this.partidosService.crearPartido(partido).subscribe({
      next: (resp) => {
        console.log('Partido creado:', resp);
        this.mensaje = 'Partido creado correctamente.';
        this.cargarPartidos();
        this.nuevoPartido.equipoLocal = '';
        this.nuevoPartido.equipoVisitante = '';
        this.nuevoPartido.fecha = '';
        this.nuevoPartido.ubicacion = '';
        this.nuevoPartido.arbitro = '';
        this.nuevoPartido.golesLocal = 0;
        this.nuevoPartido.golesVisitante = 0;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error creando partido', err);
        this.mensaje = 'Error al crear el partido.';
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }
}
