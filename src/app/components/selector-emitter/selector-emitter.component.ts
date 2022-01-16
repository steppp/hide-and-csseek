import { Component, OnInit } from '@angular/core';
import { SelectorNotifierService } from 'src/app/services/selector-notifier.service';
import { SelectorValidityCheckerService } from 'src/app/services/selector-validity-checker.service';

@Component({
  selector: 'app-selector-emitter',
  templateUrl: './selector-emitter.component.html',
  styleUrls: ['./selector-emitter.component.scss']
})
export class SelectorEmitterComponent implements OnInit {

  constructor(
    private _selectorNotifierService: SelectorNotifierService,
    private _selectorValidityChecker: SelectorValidityCheckerService
  ) { }

  ngOnInit(): void {
  }

  selectorInputChanged(ev: Event): void {
    let kbdEvt = ev as KeyboardEvent;
    const targetInputElement = kbdEvt.target as HTMLInputElement;
    const selector = targetInputElement.value;

    if (this._selectorValidityChecker.isValid(selector)) {
      this._selectorNotifierService.notifySelectorChanged(selector);
    } else {
      console.warn(`Selector ${selector} is not valid. Reason: ${this._selectorValidityChecker.resultReason}.`);
    }
  }

}
