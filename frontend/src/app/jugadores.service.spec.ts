import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JugadoresService, Jugador } from './jugadores.service';

describe('JugadoresService (UT4)', () => {
  let service: JugadoresService;
  let httpMock: HttpTestingController;

  const API_URL = 'http://localhost:8000/api/jugadores';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JugadoresService]
    });

    service = TestBed.inject(JugadoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de jugadores (mock JSON) con GET', () => {
    const mockJugadores: Jugador[] = [
      { id: 1, nombre: 'Jugador 1', edad: 20, posicion: 'Delantero', dorsal: 9, club_id: 1 },
      { id: 2, nombre: 'Jugador 2', edad: 22, posicion: 'Defensa', dorsal: 4, club_id: 1 }
    ];

    service.getJugadores().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].nombre).toBe('Jugador 1');
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockJugadores);
  });

  it('debe manejar un error 500 del servidor', () => {
    service.getJugadores().subscribe({
      next: () => fail('Debería fallar'),
      error: (err) => expect(err.status).toBe(500)
    });

    const req = httpMock.expectOne(API_URL);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});