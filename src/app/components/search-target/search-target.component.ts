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
      return;
    }

    const fragmentDescription = this._createVisualizationFor(fragment!);
    console.log(fragmentDescription);

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

  private _createVisualizationFor(fragment: Node, level: number = 0): string {
    const prependedTabs = "\t".repeat(level);
    let strResult = "";

    switch (fragment.nodeType) {
      case Node.TEXT_NODE:
        if (fragment.textContent?.trim() === "") {
          return "";
        }

        return prependedTabs + fragment.textContent + "\n";

      case Node.DOCUMENT_FRAGMENT_NODE:
        Array.from(fragment.childNodes).forEach(child => {
          strResult += prependedTabs + this._createVisualizationFor(child, level + 1) + "\n";
        });
        return strResult;
        
      default:
        strResult += prependedTabs + this._getElementOpeningTagStringRepresentation(fragment);
        strResult += "\n";

        Array.from(fragment.childNodes).forEach(child => {
          strResult += this._createVisualizationFor(child, level + 1);
        });

        strResult += prependedTabs + this._getElementClosingTagStringRepresentation(fragment);
        strResult += "\n"
    }

    return strResult;
  }

  private _getElementOpeningTagStringRepresentation(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? "";
    }

    const htmlElement = node as HTMLElement;
    if (!htmlElement) {
      return "";
    }

    return `<${htmlElement.tagName.toLowerCase()} class="${htmlElement.classList.value}">`;
  }

  private _getElementClosingTagStringRepresentation(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? "";
    }

    const htmlElement = node as HTMLElement;
    if (!htmlElement) {
      return "";
    }

    return `</${htmlElement.tagName.toLowerCase()}>`;
  }
}
