import {
beforeEachProviders,
it,
describe,
expect,
inject
} from '@angular/core/testing';
import { ClassRoomService } from './class-room.service';
import {COMMON_PROVIDERS} from '../../shared/common-providers';
describe('ClassRoom Service', () => {
  beforeEachProviders(() => [COMMON_PROVIDERS, ClassRoomService]);

  it('should ...',
    inject([ClassRoomService], (service: ClassRoomService) => {
      expect(service).toBeTruthy();
    }));
});
