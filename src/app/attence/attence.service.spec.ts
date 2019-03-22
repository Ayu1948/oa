import { TestBed } from '@angular/core/testing';

import { AttenceService } from './attence.service';

describe('AttenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttenceService = TestBed.get(AttenceService);
    expect(service).toBeTruthy();
  });
});
