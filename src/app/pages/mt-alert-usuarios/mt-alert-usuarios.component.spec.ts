import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtAlertUsuariosComponent } from './mt-alert-usuarios.component';

describe('MtAlertUsuariosComponent', () => {
  let component: MtAlertUsuariosComponent;
  let fixture: ComponentFixture<MtAlertUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MtAlertUsuariosComponent]
    });
    fixture = TestBed.createComponent(MtAlertUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
