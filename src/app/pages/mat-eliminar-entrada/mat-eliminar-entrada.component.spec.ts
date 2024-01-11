import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarEntradaComponent } from './mat-eliminar-entrada.component';

describe('MatEliminarEntradaComponent', () => {
  let component: MatEliminarEntradaComponent;
  let fixture: ComponentFixture<MatEliminarEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarEntradaComponent]
    });
    fixture = TestBed.createComponent(MatEliminarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
