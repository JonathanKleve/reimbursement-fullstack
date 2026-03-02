import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementListComponent } from './reimbursement-list.component';

describe('ReimbursementList', () => {
  let component: ReimbursementListComponent;
  let fixture: ComponentFixture<ReimbursementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimbursementListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
