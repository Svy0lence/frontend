import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaComponent } from './unidad-medida.component';

describe('UnidadMedidaComponent', () => {
  let component: UnidadMedidaComponent;
  let fixture: ComponentFixture<UnidadMedidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadMedidaComponent]
    });
    fixture = TestBed.createComponent(UnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
