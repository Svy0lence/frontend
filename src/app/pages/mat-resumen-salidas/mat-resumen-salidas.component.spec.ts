import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatResumenSalidasComponent } from './mat-resumen-salidas.component';

describe('MatResumenSalidasComponent', () => {
  let component: MatResumenSalidasComponent;
  let fixture: ComponentFixture<MatResumenSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatResumenSalidasComponent]
    });
    fixture = TestBed.createComponent(MatResumenSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
