import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRegisterComponent } from './mat-register.component';

describe('MatRegisterComponent', () => {
  let component: MatRegisterComponent;
  let fixture: ComponentFixture<MatRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatRegisterComponent]
    });
    fixture = TestBed.createComponent(MatRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
