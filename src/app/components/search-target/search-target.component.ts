import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HtmlTemplateBuilderService } from 'src/app/services/html-template-builder.service';
import { SelectorNotifierService } from 'src/app/services/selector-notifier.service';

@Component({
  selector: 'app-search-target',
  templateUrl: './search-target.component.html',
  styleUrls: ['./search-target.component.scss']
})
export class SearchTargetComponent implements OnInit {

  @ViewChild('snippetCtr') snippetContainer?: ElementRef<HTMLDivElement>;
  currentSelector: string;
  injectedContent?: string;

  constructor(
    private _selectorNotifierService: SelectorNotifierService,
    private _htmlTemplateBuilder: HtmlTemplateBuilderService,
  ) {
    this.currentSelector = "";
    _selectorNotifierService.$selector.subscribe({
      next: (value) => this.currentSelector = value
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._htmlTemplateBuilder.$builtTemplate.subscribe({
      next: this.handleNewDocumentFragment.bind(this)
    })
  }

  private handleNewDocumentFragment(fragment: DocumentFragment | undefined) {
    if (!fragment) {
      console.warn("Document fragment is undefined");
    }

    this.snippetContainer?.nativeElement.replaceChildren();
    if (fragment) {
      // removing this if would cause an error to show up in the console
      this.snippetContainer?.nativeElement.appendChild(fragment);
    }
  }
}
