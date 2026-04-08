// src/app/roles/arbitro/arbitro.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PartidosService, Partido } from '../../partidos.service';

@Component({
  selector: 'app-arbitro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arbitro.html',
  styleUrl: './arbitro.css'
})
export class Arbitro implements OnInit {

  usuario = '';
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
    this.cargarPartidosArbitro();
  }

  cargarPartidosArbitro(): void {
    this.cargando = true;
    this.mensaje = '';

    this.partidosService.getPartidosArbitro(this.usuario)
      .subscribe({
        next: (lista) => {
          this.partidos = lista;
          if (lista.length === 0) {
            this.mensaje = 'No tienes partidos asignados.';
          }
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando partidos del árbitro', err);
          this.mensaje = 'Error al cargar tus partidos desde el servidor.';
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
