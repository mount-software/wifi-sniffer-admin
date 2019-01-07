import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordRequestComponent } from './recover-password-request.component';

describe('RecoverPasswordRequestComponent', () => {
  let component: RecoverPasswordRequestComponent;
  let fixture: ComponentFixture<RecoverPasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswordRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
