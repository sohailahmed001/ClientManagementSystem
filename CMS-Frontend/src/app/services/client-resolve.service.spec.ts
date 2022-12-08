import { TestBed } from '@angular/core/testing';

import { ClientResolveService } from './client-resolve.service';

describe('ClientResolveService', () => {
  let service: ClientResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
