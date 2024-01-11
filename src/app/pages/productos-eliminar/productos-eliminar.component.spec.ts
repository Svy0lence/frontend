import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEliminarComponent } from './productos-eliminar.component';

describe('ProductosEliminarComponent', () => {
  let component: ProductosEliminarComponent;
  let fixture: ComponentFixture<ProductosEliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosEliminarComponent]
    });
    fixture = TestBed.createComponent(ProductosEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
