import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiDetailsDialogComponent } from './wifi-details-dialog.component';

describe('WifiDetailsDialogComponent', () => {
  let component: WifiDetailsDialogComponent;
  let fixture: ComponentFixture<WifiDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
