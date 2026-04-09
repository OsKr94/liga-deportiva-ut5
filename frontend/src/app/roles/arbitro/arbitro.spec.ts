import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Arbitro } from './arbitro';

describe('Arbitro', () => {
  let component: Arbitro;
  let fixture: ComponentFixture<Arbitro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arbitro],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arbitro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
