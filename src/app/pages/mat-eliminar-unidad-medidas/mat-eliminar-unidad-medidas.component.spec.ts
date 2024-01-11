import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarUnidadMedidasComponent } from './mat-eliminar-unidad-medidas.component';

describe('MatEliminarUnidadMedidasComponent', () => {
  let component: MatEliminarUnidadMedidasComponent;
  let fixture: ComponentFixture<MatEliminarUnidadMedidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarUnidadMedidasComponent]
    });
    fixture = TestBed.createComponent(MatEliminarUnidadMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
