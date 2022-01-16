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

  private _selectedElements: HTMLElement[] = [];
  private _selectionElementClassName: string = "selection-target";

  constructor(
    private _selectorNotifierService: SelectorNotifierService,
    private _htmlTemplateBuilder: HtmlTemplateBuilderService,
  ) {
    this.currentSelector = "";
    _selectorNotifierService.$selector.subscribe({
      next: this.handleSelectorStringUpdate.bind(this)
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

  handleSelectorStringUpdate(selector: string) {
    this._deselectAllElements();

    try {
      this.snippetContainer?.nativeElement.querySelectorAll(selector)
        .forEach((element, key, parent) => {
          console.log(element);

          this._select(element as HTMLElement);
        }
      );
    } catch (_) { }
  }

  private _select(element: HTMLElement) {
    element.classList.add(this._selectionElementClassName);
    this._selectedElements.push(element);
  }

  private _deselectElement(element: HTMLElement) {
    element.classList.remove(this._selectionElementClassName);
  }

  private _deselectAllElements() {
    this._selectedElements.forEach(el => this._deselectElement(el));
    this._selectedElements = []
  }
}
