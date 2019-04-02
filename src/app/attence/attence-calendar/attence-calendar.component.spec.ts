import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenceCalendarComponent } from './attence-calendar.component';

describe('AttenceCalendarComponent', () => {
  let component: AttenceCalendarComponent;
  let fixture: ComponentFixture<AttenceCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttenceCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttenceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
