import {
beforeEachProviders,
it,
describe,
expect,
inject
} from '@angular/core/testing';
import { ClassRoomSubjectService } from './class-room-subject.service';
import {COMMON_PROVIDERS} from '../../shared/common-providers';
describe('ClassRoomSubject Service', () => {
  beforeEachProviders(() => [COMMON_PROVIDERS, ClassRoomSubjectService]);

  it('should ...',
    inject([ClassRoomSubjectService], (service: ClassRoomSubjectService) => {
      expect(service).toBeTruthy();
    }));
});
