import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldArchivedComponent } from './sold-archived.component';

describe('SoldArchivedComponent', () => {
  let component: SoldArchivedComponent;
  let fixture: ComponentFixture<SoldArchivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldArchivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
