import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditarRolesComponent } from './mat-editar-roles.component';

describe('MatEditarRolesComponent', () => {
  let component: MatEditarRolesComponent;
  let fixture: ComponentFixture<MatEditarRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarRolesComponent]
    });
    fixture = TestBed.createComponent(MatEditarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
