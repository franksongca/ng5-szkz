import { TestBed, inject } from '@angular/core/testing';

import { SzkzDrawingService } from './tyts-drawing.service';

describe('SzkzDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SzkzDrawingService]
    });
  });

  it('should be created', inject([SzkzDrawingService], (service: SzkzDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
