// src/app/roles/usuario/usuario.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidosService, Partido } from '../../partidos.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {

  usuario = '';
  equipo = '';          // equipo al que "pertenece"
  partidos: Partido[] = [];

  cargando = false;
  mensaje = '';

  constructor(
    private partidosService: PartidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLS = localStorage.getItem('usuario');
    if (!usuarioLS) {
      this.mensaje = 'No se ha encontrado el usuario en la sesión.';
      return;
    }
    this.usuario = usuarioLS;
  }

  buscarPartidos(): void {
    if (!this.equipo.trim()) {
      this.mensaje = 'Escribe el nombre de tu equipo.';
      this.partidos = [];
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.partidosService.getPartidosEquipo(this.equipo.trim())
      .subscribe({
        next: (lista) => {
          this.partidos = lista;
          if (lista.length === 0) {
            this.mensaje = 'No hay partidos para ese equipo.';
          }
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando partidos del equipo', err);
          this.mensaje = 'Error al cargar los partidos desde el servidor.';
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
