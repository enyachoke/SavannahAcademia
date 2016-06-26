import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Time } from './time.pipe';

describe('Time Pipe', () => {
  beforeEachProviders(() => [Time]);

  it('should transform the input', inject([Time], (pipe: Time) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
