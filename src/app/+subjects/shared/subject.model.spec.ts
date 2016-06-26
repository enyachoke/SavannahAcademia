import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Subject} from './subject.model';

describe('Subject', () => {
  it('should create an instance', () => {
    expect(new Subject()).toBeTruthy();
  });
});
