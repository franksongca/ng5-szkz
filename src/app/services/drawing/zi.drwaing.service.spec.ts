import { TestBed, inject } from '@angular/core/testing';

import { ZiDrawingService } from './zi.drawing.service';

describe('ZiDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZiDrawingService]
    });
  });

  it('should be created', inject([ZiDrawingService], (service: ZiDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
