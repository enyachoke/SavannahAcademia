import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { StudentService } from './student.service';

describe('Student Service', () => {
  beforeEachProviders(() => [StudentService]);

  it('should ...',
      inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));
});
