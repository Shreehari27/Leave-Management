import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetail } from './leave-detail';

describe('LeaveDetail', () => {
  let component: LeaveDetail;
  let fixture: ComponentFixture<LeaveDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
