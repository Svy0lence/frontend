import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderXMLBOLETAFACTURAComponent } from './vender-xmlboleta-factura.component';

describe('VenderXMLBOLETAFACTURAComponent', () => {
  let component: VenderXMLBOLETAFACTURAComponent;
  let fixture: ComponentFixture<VenderXMLBOLETAFACTURAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenderXMLBOLETAFACTURAComponent]
    });
    fixture = TestBed.createComponent(VenderXMLBOLETAFACTURAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
