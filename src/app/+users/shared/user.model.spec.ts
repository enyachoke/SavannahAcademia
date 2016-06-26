import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {User} from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
});
