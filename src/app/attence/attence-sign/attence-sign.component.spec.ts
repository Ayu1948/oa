import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenceSignComponent } from './attence-sign.component';

describe('AttenceSignComponent', () => {
  let component: AttenceSignComponent;
  let fixture: ComponentFixture<AttenceSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttenceSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttenceSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
