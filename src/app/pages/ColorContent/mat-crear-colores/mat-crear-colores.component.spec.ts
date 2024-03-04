import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCrearColoresComponent } from './mat-crear-colores.component';


describe('MatCrearDepartamentosComponent', () => {
  let component: MatCrearColoresComponent;
  let fixture: ComponentFixture<MatCrearColoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearColoresComponent]
    });
    fixture = TestBed.createComponent(MatCrearColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
