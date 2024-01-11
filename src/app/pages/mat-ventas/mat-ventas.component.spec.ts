import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatVentasComponent } from './mat-ventas.component';

describe('MatVentasComponent', () => {
  let component: MatVentasComponent;
  let fixture: ComponentFixture<MatVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatVentasComponent]
    });
    fixture = TestBed.createComponent(MatVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
