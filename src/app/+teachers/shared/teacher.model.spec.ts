import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Teacher} from './teacher.model';

describe('Teacher', () => {
  it('should create an instance', () => {
    expect(new Teacher()).toBeTruthy();
  });
});
