import { TestBed, inject } from '@angular/core/testing';

import { ZiService } from './zi.service';

describe('Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZiService]
    });
  });

  it('should be created', inject([ZiService], (service: ZiService) => {
    expect(service).toBeTruthy();
  }));
});
