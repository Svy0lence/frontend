import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificadorComponent } from './notificador.component';

describe('NotificadorComponent', () => {
  let component: NotificadorComponent;
  let fixture: ComponentFixture<NotificadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificadorComponent]
    });
    fixture = TestBed.createComponent(NotificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
