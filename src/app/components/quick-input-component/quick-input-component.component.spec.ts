import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInputComponentComponent } from './quick-input-component.component';

describe('QuickInputComponentComponent', () => {
  let component: QuickInputComponentComponent;
  let fixture: ComponentFixture<QuickInputComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickInputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
