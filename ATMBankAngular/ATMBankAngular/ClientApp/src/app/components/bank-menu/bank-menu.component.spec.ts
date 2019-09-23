import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMenuComponent } from './bank-menu.component';

describe('BankMenuComponent', () => {
  let component: BankMenuComponent;
  let fixture: ComponentFixture<BankMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
