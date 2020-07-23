import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseDetailsComponent } from './open-house-details.component';

describe('OpenHouseDetailsComponent', () => {
  let component: OpenHouseDetailsComponent;
  let fixture: ComponentFixture<OpenHouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenHouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
