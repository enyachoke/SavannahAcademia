import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SubjectMarkService } from './subject-mark.service';

describe('SubjectMark Service', () => {
  beforeEachProviders(() => [SubjectMarkService]);

  it('should ...',
      inject([SubjectMarkService], (service: SubjectMarkService) => {
    expect(service).toBeTruthy();
  }));
});
