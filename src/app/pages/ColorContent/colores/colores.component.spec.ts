import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColoresComponent } from './colores.component';


describe('DepartamentoComponent', () => {
  let component: ColoresComponent;
  let fixture: ComponentFixture<ColoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColoresComponent]
    });
    fixture = TestBed.createComponent(ColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
