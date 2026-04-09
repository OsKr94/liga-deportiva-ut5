import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';   // 👈 usamos el servicio

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  modelo = {
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    tipo: 'normal'
  };

  mensaje = '';
  cargando = false;

  constructor(private authService: AuthService) {}

  private obtenerMensajeError(err: any): string {
    const apiMessage = err?.error?.mensaje || err?.error?.message;
    if (apiMessage) {
      return apiMessage;
    }

    const errores = err?.error?.errors;
    if (errores && typeof errores === 'object') {
      const primerCampo = Object.keys(errores)[0];
      const primerError = primerCampo ? errores[primerCampo]?.[0] : null;
      if (primerError) {
        return primerError;
      }
    }

    return 'Error al conectar con el servidor.';
  }

  onSubmit() {
    this.cargando = true;
    this.mensaje = '';

    this.authService.registro(this.modelo)
      .subscribe({
        next: (resp) => {
          console.log('✅ Respuesta registro API:', resp);
          this.mensaje = resp.mensaje ?? 'Registro recibido (de prueba).';
          this.cargando = false;
        },
        error: (err) => {
          console.error('❌ Error en registro:', err);
          this.mensaje = this.obtenerMensajeError(err);
          this.cargando = false;
        }
      });
  }
}
