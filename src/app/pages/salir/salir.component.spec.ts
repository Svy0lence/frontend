import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalirComponent } from './salir.component';

describe('SalirComponent', () => {
  let component: SalirComponent;
  let fixture: ComponentFixture<SalirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalirComponent]
    });
    fixture = TestBed.createComponent(SalirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
