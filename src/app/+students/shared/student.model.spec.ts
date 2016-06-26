import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Student} from './student.model';

describe('Student', () => {
  it('should create an instance', () => {
    expect(new Student()).toBeTruthy();
  });
});
