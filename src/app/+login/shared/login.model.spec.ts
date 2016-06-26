import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Login} from './login.model';

describe('Login', () => {
  it('should create an instance', () => {
    expect(new Login()).toBeTruthy();
  });
});
