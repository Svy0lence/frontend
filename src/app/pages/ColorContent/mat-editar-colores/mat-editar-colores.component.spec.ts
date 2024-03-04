import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatEditarColoresComponent } from './mat-editar-colores.component';


describe('MatEditarColoresComponent', () => {
  let component: MatEditarColoresComponent;
  let fixture: ComponentFixture<MatEditarColoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarColoresComponent]
    });
    fixture = TestBed.createComponent(MatEditarColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
