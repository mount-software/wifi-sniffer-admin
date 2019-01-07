import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordValidateComponent } from './recover-password-validate.component';

describe('RecoverPasswordValidateComponent', () => {
  let component: RecoverPasswordValidateComponent;
  let fixture: ComponentFixture<RecoverPasswordValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswordValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
