import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsUserComponent } from './locations-user.component';

describe('LocationsUserComponent', () => {
  let component: LocationsUserComponent;
  let fixture: ComponentFixture<LocationsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
