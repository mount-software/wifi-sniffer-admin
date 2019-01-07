import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationUserComponent } from './edit-location-user.component';

describe('EditLocationUserComponent', () => {
  let component: EditLocationUserComponent;
  let fixture: ComponentFixture<EditLocationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
