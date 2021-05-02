import { TestBed } from '@angular/core/testing';

import { DaylightTimeService } from './daylight-time.service';

describe('DaylightTimeService', () => {
  let service: DaylightTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaylightTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
