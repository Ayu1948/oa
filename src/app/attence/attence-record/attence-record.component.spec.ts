import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenceRecordComponent } from './attence-record.component';

describe('AttenceRecordComponent', () => {
  let component: AttenceRecordComponent;
  let fixture: ComponentFixture<AttenceRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttenceRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttenceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
