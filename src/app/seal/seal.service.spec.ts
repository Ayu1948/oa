import { TestBed } from '@angular/core/testing';

import { SealService } from './seal.service';

describe('SealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SealService = TestBed.get(SealService);
    expect(service).toBeTruthy();
  });
});
