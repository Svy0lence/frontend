import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarProductosComponent } from './mat-editar-productos.component';

describe('MatEditarProductosComponent', () => {
  let component: MatEditarProductosComponent;
  let fixture: ComponentFixture<MatEditarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarProductosComponent]
    });
    fixture = TestBed.createComponent(MatEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
