import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarClientesComponent } from './mat-eliminar-clientes.component';

describe('MatEliminarClientesComponent', () => {
  let component: MatEliminarClientesComponent;
  let fixture: ComponentFixture<MatEliminarClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarClientesComponent]
    });
    fixture = TestBed.createComponent(MatEliminarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
