import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Term} from './term.model';

describe('Term', () => {
  it('should create an instance', () => {
    expect(new Term()).toBeTruthy();
  });
});
