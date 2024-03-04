import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCrearTallasComponent } from './mat-crear-tallas.component';


describe('MatCrearDepartamentosComponent', () => {
  let component: MatCrearTallasComponent;
  let fixture: ComponentFixture<MatCrearTallasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearTallasComponent]
    });
    fixture = TestBed.createComponent(MatCrearTallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
