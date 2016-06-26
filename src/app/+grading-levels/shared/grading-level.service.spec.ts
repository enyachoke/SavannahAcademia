import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GradingLevelService } from './grading-level.service';

describe('GradingLevel Service', () => {
  beforeEachProviders(() => [GradingLevelService]);

  it('should ...',
      inject([GradingLevelService], (service: GradingLevelService) => {
    expect(service).toBeTruthy();
  }));
});
