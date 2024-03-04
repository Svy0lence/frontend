import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarMarcasComponent } from './mat-editar-marcas.component';

describe('MatEditarDepartamentosComponent', () => {
  let component: MatEditarMarcasComponent;
  let fixture: ComponentFixture<MatEditarMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarMarcasComponent]
    });
    fixture = TestBed.createComponent(MatEditarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
