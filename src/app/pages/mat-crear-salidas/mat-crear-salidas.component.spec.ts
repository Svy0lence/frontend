import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearSalidasComponent } from './mat-crear-salidas.component';

describe('MatCrearSalidasComponent', () => {
  let component: MatCrearSalidasComponent;
  let fixture: ComponentFixture<MatCrearSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearSalidasComponent]
    });
    fixture = TestBed.createComponent(MatCrearSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
