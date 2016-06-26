import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ClassRoomService } from './class-room.service';

describe('ClassRoom Service', () => {
  beforeEachProviders(() => [ClassRoomService]);

  it('should ...',
      inject([ClassRoomService], (service: ClassRoomService) => {
    expect(service).toBeTruthy();
  }));
});
