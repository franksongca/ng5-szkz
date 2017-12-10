import { TestBed, inject } from '@angular/core/testing';

import { HanziDrawingService } from './hanzi.drawing.service';

describe('HanziDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HanziDrawingService]
    });
  });

  it('should be created', inject([HanziDrawingService], (service: HanziDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
