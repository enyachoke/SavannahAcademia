import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ClassRoomSubjectService } from './class-room-subject.service';

describe('ClassRoomSubject Service', () => {
  beforeEachProviders(() => [ClassRoomSubjectService]);

  it('should ...',
      inject([ClassRoomSubjectService], (service: ClassRoomSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
