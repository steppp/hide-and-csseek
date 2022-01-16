import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorNotifierService implements OnDestroy {

  public $selector: Subject<string>;

  constructor() { 
    this.$selector = new Subject();
  }

  ngOnDestroy() {
    this.$selector.complete();
  }

  notifySelectorChanged(selector: string) {
    this.$selector.next(selector);
  }
}
