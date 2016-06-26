import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ClassTimingService } from './class-timing.service';

describe('ClassTiming Service', () => {
  beforeEachProviders(() => [ClassTimingService]);

  it('should ...',
      inject([ClassTimingService], (service: ClassTimingService) => {
    expect(service).toBeTruthy();
  }));
});
