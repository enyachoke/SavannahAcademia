import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Day} from './day.model';

describe('Day', () => {
  it('should create an instance', () => {
    expect(new Day()).toBeTruthy();
  });
});
