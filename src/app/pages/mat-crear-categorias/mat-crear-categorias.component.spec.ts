import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearCategoriasComponent } from './mat-crear-categorias.component';

describe('MatCrearCategoriasComponent', () => {
  let component: MatCrearCategoriasComponent;
  let fixture: ComponentFixture<MatCrearCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearCategoriasComponent]
    });
    fixture = TestBed.createComponent(MatCrearCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
