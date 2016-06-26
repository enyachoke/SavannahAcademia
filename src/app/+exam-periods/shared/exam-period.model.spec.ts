import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {ExamPeriod} from './exam-period.model';

describe('ExamPeriod', () => {
  it('should create an instance', () => {
    expect(new ExamPeriod()).toBeTruthy();
  });
});
