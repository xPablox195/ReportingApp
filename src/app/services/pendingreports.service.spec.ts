import { TestBed } from '@angular/core/testing';

import { PendingreportsService } from './pendingreports.service';

describe('PendingreportsService', () => {
  let service: PendingreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
