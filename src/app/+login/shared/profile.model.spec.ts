import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Profile} from './profile.model';

describe('Profile', () => {
  it('should create an instance', () => {
    expect(new Profile()).toBeTruthy();
  });
});
