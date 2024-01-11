import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarUsuariosComponent } from './mat-editar-usuarios.component';

describe('MatEditarUsuariosComponent', () => {
  let component: MatEditarUsuariosComponent;
  let fixture: ComponentFixture<MatEditarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarUsuariosComponent]
    });
    fixture = TestBed.createComponent(MatEditarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
