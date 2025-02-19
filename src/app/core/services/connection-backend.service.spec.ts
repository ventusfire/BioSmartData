import { TestBed } from '@angular/core/testing';

import { ConnectionBackendService } from './connection-backend.service';

describe('ConnectionBackendService', () => {
  let service: ConnectionBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
