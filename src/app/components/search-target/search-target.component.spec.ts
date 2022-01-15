import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTargetComponent } from './search-target.component';

describe('SearchTargetComponent', () => {
  let component: SearchTargetComponent;
  let fixture: ComponentFixture<SearchTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
