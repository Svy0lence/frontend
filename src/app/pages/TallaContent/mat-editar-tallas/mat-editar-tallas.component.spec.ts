import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarTallasComponent } from './mat-editar-tallas.component';

describe('MatEditarDepartamentosComponent', () => {
  let component: MatEditarTallasComponent;
  let fixture: ComponentFixture<MatEditarTallasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarTallasComponent]
    });
    fixture = TestBed.createComponent(MatEditarTallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
