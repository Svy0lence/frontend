import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearMarcasComponent } from './mat-crear-marcas.component';

describe('MatCrearDepartamentosComponent', () => {
  let component: MatCrearMarcasComponent;
  let fixture: ComponentFixture<MatCrearMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearMarcasComponent]
    });
    fixture = TestBed.createComponent(MatCrearMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
