import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HtmlTemplateBuilderService } from 'src/app/services/html-template-builder.service';
import { SelectorNotifierService } from 'src/app/services/selector-notifier.service';

@Component({
  selector: 'app-search-target',
  templateUrl: './search-target.component.html',
  styleUrls: ['./search-target.component.scss']
})
export class SearchTargetComponent implements OnInit {
  private readonly TARGET_ELEMENTS_DATASET_ID = "targetElementId";

  @ViewChild('snippetCtr') snippetContainer?: ElementRef<HTMLDivElement>;
  currentSelector: string;
  injectedContent?: string;

  private _selectedElements: HTMLElement[] = [];
  private _selectionElementClassName: string = "selection-target";
  private _elementCounter: number;
  private _originalFragment?: DocumentFragment;

  constructor(
    private _selectorNotifierService: SelectorNotifierService,
    private _htmlTemplateBuilder: HtmlTemplateBuilderService,
    private _ngZone: NgZone,
  ) {
    this.currentSelector = "";
    this._elementCounter = 0;

    _selectorNotifierService.$selector.subscribe({
      next: selector => this._ngZone.run(this.handleSelectorStringUpdate.bind(this, selector))
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

    this._elementCounter = 0;
    this._originalFragment = fragment;
    const convertedFragment = this._createVisualizationFor(fragment!);

    this.snippetContainer?.nativeElement.replaceChildren();
    if (convertedFragment) {
      // removing this if would cause an error to show up in the console
      this.snippetContainer?.nativeElement.appendChild(convertedFragment);
    }
  }

  handleSelectorStringUpdate(selector: string) {
    this._deselectAllElements();

    try {
      this._originalFragment?.querySelectorAll(selector)
        .forEach((element, key, parent) => {
          console.log(element);

          this._selectFrom(element as HTMLElement);
        }
      );
    } catch (_) { }
  }

  private _selectFrom(element: HTMLElement) {
    const actualElementId = element.dataset[this.TARGET_ELEMENTS_DATASET_ID] ?? "";
    const elementToSelect = document.getElementById(actualElementId);

    if (elementToSelect) {
      elementToSelect.classList.add(this._selectionElementClassName);
      this._selectedElements.push(elementToSelect);
    } else {
      console.warn("Cannot select element with id {id}", actualElementId)
    }
  }

  private _deselectElement(element: HTMLElement) {
    element.classList.remove(this._selectionElementClassName);
  }

  private _deselectAllElements() {
    this._selectedElements.forEach(el => this._deselectElement(el));
    this._selectedElements = []
  }

  private _createVisualizationFor(fragment: Node, level: number = 0): Node | undefined {
    let resultFragment = new DocumentFragment();
    const htmlElement = fragment as HTMLElement;

    switch (fragment.nodeType) {
      case Node.TEXT_NODE:
        return undefined;

      case Node.DOCUMENT_FRAGMENT_NODE:
        let documentNodeChildRepresentation: Node | undefined;

        Array.from(fragment.childNodes).forEach(child => {
          documentNodeChildRepresentation = this._createVisualizationFor(child, level + 1);
          (documentNodeChildRepresentation && resultFragment.appendChild(documentNodeChildRepresentation));
        });
        return resultFragment;
        
      default:
        const newDivId = this._getElementId(this._elementCounter++);
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", newDivId);
        newDiv.classList.add("new-level");
        if (htmlElement) {
          htmlElement.dataset[this.TARGET_ELEMENTS_DATASET_ID] = newDivId
        }

        newDiv.appendChild(document
          .createTextNode(this._getElementOpeningTagStringRepresentation(fragment) + "\n"));

        let normalNodeChildRepresentation: Node | undefined;
        Array.from(fragment.childNodes).forEach(child => {
          normalNodeChildRepresentation = this._createVisualizationFor(child, level + 1);
          (normalNodeChildRepresentation && newDiv.appendChild(normalNodeChildRepresentation));
        });

        newDiv.appendChild(document
          .createTextNode(this._getElementClosingTagStringRepresentation(fragment) + "\n"));

        resultFragment.appendChild(newDiv);
    }

    return resultFragment;
  }

  private _getElementOpeningTagStringRepresentation(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? "";
    }

    const htmlElement = node as HTMLElement;
    if (!htmlElement) {
      return "";
    }

    return `<${htmlElement.tagName.toLowerCase()}>`;
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

  private _getElementId(elementNumber: number): string {
    return `el${elementNumber}`;
  }
}
