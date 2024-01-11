import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearUnidadComprasComponent } from './mat-crear-unidad-compras.component';

describe('MatCrearUnidadComprasComponent', () => {
  let component: MatCrearUnidadComprasComponent;
  let fixture: ComponentFixture<MatCrearUnidadComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearUnidadComprasComponent]
    });
    fixture = TestBed.createComponent(MatCrearUnidadComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
