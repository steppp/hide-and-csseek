import { TestBed } from '@angular/core/testing';

import { HtmlTemplateBuilderService } from './html-template-builder.service';

describe('HtmlTemplateSnippetService', () => {
  let service: HtmlTemplateBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlTemplateBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
