import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {ClassRoomSubject} from './class-room-subject.model';

describe('ClassRoomSubject', () => {
  it('should create an instance', () => {
    expect(new ClassRoomSubject()).toBeTruthy();
  });
});
