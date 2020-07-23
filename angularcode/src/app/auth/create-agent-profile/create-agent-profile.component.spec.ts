import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgentProfileComponent } from './create-agent-profile.component';

describe('CreateAgentProfileComponent', () => {
  let component: CreateAgentProfileComponent;
  let fixture: ComponentFixture<CreateAgentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAgentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
