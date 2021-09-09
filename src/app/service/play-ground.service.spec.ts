import { TestBed } from '@angular/core/testing';

import { PlayGroundService } from './play-ground.service';

describe('PlayGroundService', () => {
  let service: PlayGroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayGroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
