import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarUnidadMedidasComponent } from './mat-editar-unidad-medidas.component';

describe('MatEditarUnidadMedidasComponent', () => {
  let component: MatEditarUnidadMedidasComponent;
  let fixture: ComponentFixture<MatEditarUnidadMedidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarUnidadMedidasComponent]
    });
    fixture = TestBed.createComponent(MatEditarUnidadMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
