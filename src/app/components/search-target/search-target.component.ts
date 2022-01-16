import { Component, OnInit } from '@angular/core';
import { SelectorNotifierService } from 'src/app/services/selector-notifier.service';

@Component({
  selector: 'app-search-target',
  templateUrl: './search-target.component.html',
  styleUrls: ['./search-target.component.scss']
})
export class SearchTargetComponent implements OnInit {

  currentSelector: string;

  constructor(
    private _selectorNotifierService: SelectorNotifierService
  ) {
    this.currentSelector = "";
    _selectorNotifierService.$selector.subscribe({
      next: (value) => this.currentSelector = value
    })
  }

  ngOnInit(): void {
  }
}
