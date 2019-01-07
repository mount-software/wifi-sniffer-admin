import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationOptionsComponent } from './edit-location-options.component';

describe('EditLocationOptionsComponent', () => {
  let component: EditLocationOptionsComponent;
  let fixture: ComponentFixture<EditLocationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocationOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
