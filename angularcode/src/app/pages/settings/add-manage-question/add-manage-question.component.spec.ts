import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageQuestionComponent } from './add-manage-question.component';

describe('AddManageQuestionComponent', () => {
  let component: AddManageQuestionComponent;
  let fixture: ComponentFixture<AddManageQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManageQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManageQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
