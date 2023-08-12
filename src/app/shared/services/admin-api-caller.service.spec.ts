import { TestBed } from '@angular/core/testing';

import { AdminApiCallerService } from './admin-api-caller.service';

describe('AdminApiCallerService', () => {
  let service: AdminApiCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApiCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
