import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { StudentGroupService } from './student-group.service';

describe('StudentGroup Service', () => {
  beforeEachProviders(() => [StudentGroupService]);

  it('should ...',
      inject([StudentGroupService], (service: StudentGroupService) => {
    expect(service).toBeTruthy();
  }));
});
