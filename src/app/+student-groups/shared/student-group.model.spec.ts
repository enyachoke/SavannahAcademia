import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {StudentGroup} from './student-group.model';

describe('StudentGroup', () => {
  it('should create an instance', () => {
    expect(new StudentGroup()).toBeTruthy();
  });
});
