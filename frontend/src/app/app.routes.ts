// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';

import { Admin } from './roles/admin/admin';
import { Usuario } from './roles/usuario/usuario';
import { Arbitro } from './roles/arbitro/arbitro';
import { Capitan } from './roles/capitan/capitan';
import { Home } from './secciones/home/home';

export const routes: Routes = [
  { path: '',        component: Home },    // página principal
  { path: 'login',   component: Login },   // si quieres login separado
  { path: 'registro', component: Registro },

  { path: 'admin',   component: Admin },
  { path: 'usuario', component: Usuario },
  { path: 'arbitro', component: Arbitro },
  { path: 'capitan', component: Capitan },

  { path: '**', redirectTo: '' }
];
