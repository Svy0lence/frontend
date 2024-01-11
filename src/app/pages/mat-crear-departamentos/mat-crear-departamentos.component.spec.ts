import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearDepartamentosComponent } from './mat-crear-departamentos.component';

describe('MatCrearDepartamentosComponent', () => {
  let component: MatCrearDepartamentosComponent;
  let fixture: ComponentFixture<MatCrearDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearDepartamentosComponent]
    });
    fixture = TestBed.createComponent(MatCrearDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
