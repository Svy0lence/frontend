import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaComponent } from './marcas.component';

describe('DepartamentoComponent', () => {
  let component: MarcaComponent;
  let fixture: ComponentFixture<MarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaComponent]
    });
    fixture = TestBed.createComponent(MarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
