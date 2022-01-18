import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map,  Observable,  tap } from 'rxjs';
import { HtmlTemplateProviderService } from './html-template-provider.service';

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateBuilderService {

  private $domTemplate: BehaviorSubject<DocumentFragment | undefined>;
  
  public get $builtTemplate() : Observable<DocumentFragment | undefined> {
    return this.$domTemplate.asObservable();
  }
  
  constructor( 
    htmlTemplateProvider: HtmlTemplateProviderService
  ) {
    this.$domTemplate = new BehaviorSubject<DocumentFragment | undefined>(undefined);

    htmlTemplateProvider.$htmlSnippet.pipe(
      map(template => this._createHTMLHierarchy(template)),
      tap(fragment => this.$domTemplate.next(fragment))
    ).subscribe()
    htmlTemplateProvider.next();
  }

  private _createHTMLHierarchy(template: string | undefined): DocumentFragment | undefined {
    if (!template) {
      return undefined;
    }

    const parseRange = document.createRange();
    return parseRange.createContextualFragment(template);
  }
}
