import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Year} from './year.model';

describe('Year', () => {
  it('should create an instance', () => {
    expect(new Year()).toBeTruthy();
  });
});
