import { TestBed } from '@angular/core/testing';

import { Reimbursement } from './reimbursement';

describe('Reimbursement', () => {
  let service: Reimbursement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reimbursement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
