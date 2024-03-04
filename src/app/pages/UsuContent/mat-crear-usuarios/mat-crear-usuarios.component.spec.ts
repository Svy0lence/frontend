import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCrearUsuariosComponent } from './mat-crear-usuarios.component';


describe('MatCrearUsuariosComponent', () => {
  let component: MatCrearUsuariosComponent;
  let fixture: ComponentFixture<MatCrearUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearUsuariosComponent]
    });
    fixture = TestBed.createComponent(MatCrearUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
