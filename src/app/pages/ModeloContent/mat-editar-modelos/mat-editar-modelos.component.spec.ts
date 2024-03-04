import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatEditarModelosComponent } from './mat-editar-modelos.component';



describe('MatEditarDepartamentosComponent', () => {
  let component: MatEditarModelosComponent;
  let fixture: ComponentFixture<MatEditarModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEditarModelosComponent]
    });
    fixture = TestBed.createComponent(MatEditarModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
