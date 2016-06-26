import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {ClassRoom} from './class-room.model';

describe('ClassRoom', () => {
  it('should create an instance', () => {
    expect(new ClassRoom()).toBeTruthy();
  });
});
