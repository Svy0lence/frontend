import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCrearRolesComponent } from './mat-crear-roles.component';

describe('MatCrearRolesComponent', () => {
  let component: MatCrearRolesComponent;
  let fixture: ComponentFixture<MatCrearRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearRolesComponent]
    });
    fixture = TestBed.createComponent(MatCrearRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
