import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarClientesComponent } from './mat-editar-clientes.component';

describe('MatEditarClientesComponent', () => {
  let component: MatEditarClientesComponent;
  let fixture: ComponentFixture<MatEditarClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarClientesComponent]
    });
    fixture = TestBed.createComponent(MatEditarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
