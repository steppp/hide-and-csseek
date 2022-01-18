import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateProviderService {

  $htmlSnippet: BehaviorSubject<string | undefined>;

  private _htmlTemplates: string[];

  constructor(
    private _httpClient: HttpClient
  ) { 
    this._htmlTemplates = [1, 2, 3]
      .map(i => `/assets/target-templates/${i}.html`)
    this.$htmlSnippet = new BehaviorSubject<string | undefined>("");
  }

  next() {
    // get the first element in the array
    const nextTemplate = this._htmlTemplates.splice(0, 1)[0];
    // put it back into the array at the end
    this._htmlTemplates.push(nextTemplate);

    this._httpClient.get(nextTemplate, {
      responseType: "text"
    })
      .pipe(
        catchError(err => of(undefined)),
        map(value => value as string | undefined),
        tap(value => this.$htmlSnippet.next(value)))
        .subscribe();
  }
}
