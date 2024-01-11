import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEliminarRolesComponent } from './mat-eliminar-roles.component';

describe('MatEliminarRolesComponent', () => {
  let component: MatEliminarRolesComponent;
  let fixture: ComponentFixture<MatEliminarRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarRolesComponent]
    });
    fixture = TestBed.createComponent(MatEliminarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
