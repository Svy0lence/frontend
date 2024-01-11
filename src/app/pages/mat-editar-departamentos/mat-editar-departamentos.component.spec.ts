import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarDepartamentosComponent } from './mat-editar-departamentos.component';

describe('MatEditarDepartamentosComponent', () => {
  let component: MatEditarDepartamentosComponent;
  let fixture: ComponentFixture<MatEditarDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarDepartamentosComponent]
    });
    fixture = TestBed.createComponent(MatEditarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
