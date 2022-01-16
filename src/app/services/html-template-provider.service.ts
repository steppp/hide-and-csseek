import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlTemplateProviderService {

  $htmlSnippet: BehaviorSubject<string | undefined>;

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.$htmlSnippet = new BehaviorSubject<string | undefined>("");
  }

  next() {
    this._httpClient.get('/assets/target-templates/basic.html', {
      responseType: "text"
    })
      .pipe(
        catchError(err => of(undefined)),
        map(value => value as string | undefined),
        tap(value => this.$htmlSnippet.next(value)))
        .subscribe();
  }
}
