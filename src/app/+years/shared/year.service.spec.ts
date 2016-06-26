import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { YearService } from './year.service';

describe('Year Service', () => {
  beforeEachProviders(() => [YearService]);

  it('should ...',
      inject([YearService], (service: YearService) => {
    expect(service).toBeTruthy();
  }));
});
