import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearProductosComponent } from './mat-crear-productos.component';

describe('MatCrearProductosComponent', () => {
  let component: MatCrearProductosComponent;
  let fixture: ComponentFixture<MatCrearProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearProductosComponent]
    });
    fixture = TestBed.createComponent(MatCrearProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
