import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarCategoriasComponent } from './mat-editar-categorias.component';

describe('MatEditarCategoriasComponent', () => {
  let component: MatEditarCategoriasComponent;
  let fixture: ComponentFixture<MatEditarCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarCategoriasComponent]
    });
    fixture = TestBed.createComponent(MatEditarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
