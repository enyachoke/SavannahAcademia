import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {SubjectMark} from './subject-mark.model';

describe('SubjectMark', () => {
  it('should create an instance', () => {
    expect(new SubjectMark()).toBeTruthy();
  });
});
