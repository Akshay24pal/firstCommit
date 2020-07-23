import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpenHouseComponent } from './add-open-house.component';

describe('AddOpenHouseComponent', () => {
  let component: AddOpenHouseComponent;
  let fixture: ComponentFixture<AddOpenHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOpenHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpenHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
