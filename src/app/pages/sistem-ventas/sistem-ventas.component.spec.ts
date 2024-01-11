import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemVentasComponent } from './sistem-ventas.component';

describe('SistemVentasComponent', () => {
  let component: SistemVentasComponent;
  let fixture: ComponentFixture<SistemVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemVentasComponent]
    });
    fixture = TestBed.createComponent(SistemVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
