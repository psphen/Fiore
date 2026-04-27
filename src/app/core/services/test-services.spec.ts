import { TestBed } from '@angular/core/testing';

import { TestServices } from './test-services';

describe('TestServices', () => {
  let service: TestServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
