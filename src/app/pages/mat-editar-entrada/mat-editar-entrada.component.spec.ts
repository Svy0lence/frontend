import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarEntradaComponent } from './mat-editar-entrada.component';

describe('MatEditarEntradaComponent', () => {
  let component: MatEditarEntradaComponent;
  let fixture: ComponentFixture<MatEditarEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarEntradaComponent]
    });
    fixture = TestBed.createComponent(MatEditarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
