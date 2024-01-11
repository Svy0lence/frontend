import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarDepartamentosComponent } from './mat-eliminar-departamentos.component';

describe('MatEliminarDepartamentosComponent', () => {
  let component: MatEliminarDepartamentosComponent;
  let fixture: ComponentFixture<MatEliminarDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarDepartamentosComponent]
    });
    fixture = TestBed.createComponent(MatEliminarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
