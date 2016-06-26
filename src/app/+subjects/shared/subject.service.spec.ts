import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SubjectService } from './subject.service';

describe('Subject Service', () => {
  beforeEachProviders(() => [SubjectService]);

  it('should ...',
      inject([SubjectService], (service: SubjectService) => {
    expect(service).toBeTruthy();
  }));
});
