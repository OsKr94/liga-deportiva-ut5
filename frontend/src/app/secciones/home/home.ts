// src/app/secciones/home/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Noticias } from '../noticias/noticias';
import { CompeticionesComponent } from '../competiciones/competiciones';
import { Login } from '../../auth/login/login';
import { Registro } from '../../auth/registro/registro';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Noticias,
    CompeticionesComponent,
    Login,
    Registro
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
