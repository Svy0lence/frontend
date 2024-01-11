import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarCategoriasComponent } from './mat-eliminar-categorias.component';

describe('MatEliminarCategoriasComponent', () => {
  let component: MatEliminarCategoriasComponent;
  let fixture: ComponentFixture<MatEliminarCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarCategoriasComponent]
    });
    fixture = TestBed.createComponent(MatEliminarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
