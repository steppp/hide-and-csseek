import { Component } from '@angular/core';
import { HtmlTemplateProviderService } from './services/html-template-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hide-and-csseek';

  constructor(
    private _htmlTemplateProvider: HtmlTemplateProviderService
  ) {

  }

  onNextTemplateBtnClick(): void {
    this._htmlTemplateProvider.next();
  }
}
