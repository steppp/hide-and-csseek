import { TestBed } from '@angular/core/testing';

import { HtmlTemplateProviderService } from './html-template-provider.service';

describe('HtmlTemplateProviderService', () => {
  let service: HtmlTemplateProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlTemplateProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
