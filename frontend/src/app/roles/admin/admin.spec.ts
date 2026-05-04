import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Admin } from './admin';
import { PartidosService } from '../../partidos.service';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;
  let routerSpy: jasmine.SpyObj<Router>;

  const partidosServiceMock = {
    getPartidos: jasmine.createSpy('getPartidos').and.returnValue(of([{ id: 1, equipoLocal: 'A', equipoVisitante: 'B' }])),
    getClubs: jasmine.createSpy('getClubs').and.returnValue(of([{ id: 1, nombre: 'Club A' }, { id: 2, nombre: 'Club B' }])),
    getLigas: jasmine.createSpy('getLigas').and.returnValue(of([{ id: 1, nombre: 'Liga A', temporada: '2025/2026' }])),
    crearPartido: jasmine.createSpy('crearPartido').and.returnValue(of({ ok: true }))
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    partidosServiceMock.getPartidos.calls.reset();
    partidosServiceMock.getClubs.calls.reset();
    partidosServiceMock.getLigas.calls.reset();
    partidosServiceMock.crearPartido.calls.reset();
    partidosServiceMock.getPartidos.and.returnValue(of([{ id: 1, equipoLocal: 'A', equipoVisitante: 'B' }]));
    partidosServiceMock.getClubs.and.returnValue(of([{ id: 1, nombre: 'Club A' }, { id: 2, nombre: 'Club B' }]));
    partidosServiceMock.getLigas.and.returnValue(of([{ id: 1, nombre: 'Liga A', temporada: '2025/2026' }]));
    partidosServiceMock.crearPartido.and.returnValue(of({ ok: true }));

    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        { provide: PartidosService, useValue: partidosServiceMock },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tipo: Unitaria | Valida que el componente Admin se crea correctamente.(comprobar que el componente se crea)
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tipo: Integracion | Valida que ngOnInit integra componente y servicio cargando catalogos y partidos.(que carga partidos, clubes y ligas desde el servicio)
  it('debe cargar partidos, clubes y ligas al iniciar', () => {
    expect(partidosServiceMock.getPartidos).toHaveBeenCalled();
    expect(partidosServiceMock.getClubs).toHaveBeenCalled();
    expect(partidosServiceMock.getLigas).toHaveBeenCalled();
    expect(component.partidos.length).toBe(1);
    expect(component.clubs.length).toBe(2);
    expect(component.ligas.length).toBe(1);
  });

  // Tipo: Mock | Simula error del servicio en carga de partidos y valida mensaje de error mostrado.(que muestra mensaje de error si falla el servicio)
  it('debe mostrar mensaje cuando falla la carga de partidos', () => {
    partidosServiceMock.getPartidos.and.returnValue(throwError(() => ({ status: 500 })));

    component.cargarPartidos();

    expect(component.mensaje).toBe('Error al cargar los partidos desde el servidor.');
    expect(component.cargando).toBeFalse();
  });
});
