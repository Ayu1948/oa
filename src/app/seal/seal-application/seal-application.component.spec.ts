import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SealApplicationComponent } from './seal-application.component';

describe('SealApplicationComponent', () => {
  let component: SealApplicationComponent;
  let fixture: ComponentFixture<SealApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SealApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SealApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
