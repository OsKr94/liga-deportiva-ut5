import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Capitan } from './capitan';

describe('Capitan', () => {
  let component: Capitan;
  let fixture: ComponentFixture<Capitan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capitan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Capitan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
