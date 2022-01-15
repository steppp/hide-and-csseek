import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorEmitterComponent } from './selector-emitter.component';

describe('SelectorEmitterComponent', () => {
  let component: SelectorEmitterComponent;
  let fixture: ComponentFixture<SelectorEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorEmitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
