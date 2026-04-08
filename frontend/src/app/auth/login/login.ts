import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginRespuesta } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  modelo = {
    usuario: '',
    password: ''
  };

  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.modelo.usuario || !this.modelo.password) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.authService.login(this.modelo)
      .subscribe({
        next: (resp: LoginRespuesta) => {
          console.log('✅ Respuesta login API:', resp);

          if (!resp.ok) {
            this.mensaje = resp.mensaje ?? 'Usuario o contraseña incorrectos.';
            this.cargando = false;
            return;
          }

          const tipo = resp.tipo ?? 'normal';

          // Guardamos tipo y nombre de usuario para otras pantallas
          localStorage.setItem('tipoUsuario', tipo);
          localStorage.setItem('usuario', this.modelo.usuario);

          // Decidir ruta según tipo
          let ruta = '/usuario';
          if (tipo === 'admin')   ruta = '/admin';
          else if (tipo === 'arbitro') ruta = '/arbitro';
          else if (tipo === 'capitan') ruta = '/capitan';

          this.mensaje = `Login correcto como ${tipo}. Redirigiendo…`;

          this.router.navigate([ruta]);
          this.cargando = false;
        },
        error: (err) => {
          console.error('❌ Error en login:', err);
          this.mensaje = 'Error al conectar con el servidor.';
          this.cargando = false;
        }
      });
  }
}

