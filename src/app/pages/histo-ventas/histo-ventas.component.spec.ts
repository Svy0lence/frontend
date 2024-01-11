import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVentasComponent } from './histo-ventas.component';

describe('HistoVentasComponent', () => {
  let component: HistoVentasComponent;
  let fixture: ComponentFixture<HistoVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoVentasComponent]
    });
    fixture = TestBed.createComponent(HistoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
