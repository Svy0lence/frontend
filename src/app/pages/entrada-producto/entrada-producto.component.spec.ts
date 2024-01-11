import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaProductoComponent } from './entrada-producto.component';

describe('EntradaProductoComponent', () => {
  let component: EntradaProductoComponent;
  let fixture: ComponentFixture<EntradaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaProductoComponent]
    });
    fixture = TestBed.createComponent(EntradaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
