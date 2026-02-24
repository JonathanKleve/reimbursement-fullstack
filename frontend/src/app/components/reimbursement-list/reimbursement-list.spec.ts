import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementList } from './reimbursement-list';

describe('ReimbursementList', () => {
  let component: ReimbursementList;
  let fixture: ComponentFixture<ReimbursementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimbursementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
