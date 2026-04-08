// src/app/roles/capitan/capitan.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capitan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capitan.html',
  styleUrl: './capitan.css'
})
export class Capitan implements OnInit {

  usuario = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioLS = localStorage.getItem('usuario');
    this.usuario = usuarioLS ?? '';
  }

  cerrarSesion(): void {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }
}
