import { TestBed } from '@angular/core/testing';

import { SerivcesCategoryService } from './serivces.category.service';

describe('SerivcesCategoryService', () => {
  let service: SerivcesCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerivcesCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
