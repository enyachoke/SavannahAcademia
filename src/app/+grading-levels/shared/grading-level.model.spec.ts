import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {GradingLevel} from './grading-level.model';

describe('GradingLevel', () => {
  it('should create an instance', () => {
    expect(new GradingLevel()).toBeTruthy();
  });
});
