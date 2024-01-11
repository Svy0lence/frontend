import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearEntradaComponent } from './mat-crear-entrada.component';

describe('MatCrearEntradaComponent', () => {
  let component: MatCrearEntradaComponent;
  let fixture: ComponentFixture<MatCrearEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearEntradaComponent]
    });
    fixture = TestBed.createComponent(MatCrearEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
