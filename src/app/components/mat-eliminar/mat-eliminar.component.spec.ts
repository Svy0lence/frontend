import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatEliminarComponent } from './mat-eliminar.component';



describe('MatEliminarEntradaComponent', () => {
  let component: MatEliminarComponent;
  let fixture: ComponentFixture<MatEliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatEliminarComponent]
    });
    fixture = TestBed.createComponent(MatEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
