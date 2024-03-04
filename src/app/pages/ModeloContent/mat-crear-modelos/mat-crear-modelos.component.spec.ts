import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCrearModelosComponent } from './mat-crear-modelos.component';


describe('MatCrearDepartamentosComponent', () => {
  let component: MatCrearModelosComponent;
  let fixture: ComponentFixture<MatCrearModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCrearModelosComponent]
    });
    fixture = TestBed.createComponent(MatCrearModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
