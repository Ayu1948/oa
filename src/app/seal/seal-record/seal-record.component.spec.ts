import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SealRecordComponent } from './seal-record.component';

describe('SealRecordComponent', () => {
  let component: SealRecordComponent;
  let fixture: ComponentFixture<SealRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SealRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SealRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
