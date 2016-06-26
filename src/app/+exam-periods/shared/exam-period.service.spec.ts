import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ExamPeriodService } from './exam-period.service';

describe('ExamPeriod Service', () => {
  beforeEachProviders(() => [ExamPeriodService]);

  it('should ...',
      inject([ExamPeriodService], (service: ExamPeriodService) => {
    expect(service).toBeTruthy();
  }));
});
