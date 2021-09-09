import { TestBed } from '@angular/core/testing';

import { SportPoolService } from './sport-pool.service';

describe('SportPoolService', () => {
  let service: SportPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
