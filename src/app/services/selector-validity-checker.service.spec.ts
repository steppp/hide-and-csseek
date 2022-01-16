import { TestBed } from '@angular/core/testing';

import { SelectorValidityCheckerService } from './selector-validity-checker.service';

describe('SelectorValidityCheckerService', () => {
  let service: SelectorValidityCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorValidityCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
