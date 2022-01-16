import { TestBed } from '@angular/core/testing';

import { SelectorNotifierService } from './selector-notifier.service';

describe('SelectorNotifierService', () => {
  let service: SelectorNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
