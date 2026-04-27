import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { exitGuard, OnExit } from './exit-guard';

describe('exitGuard', () => {
  const executeGuard: CanDeactivateFn<OnExit> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => exitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});