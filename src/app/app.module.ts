import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectorEmitterComponent } from './components/selector-emitter/selector-emitter.component';
import { SearchTargetComponent } from './components/search-target/search-target.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorEmitterComponent,
    SearchTargetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
