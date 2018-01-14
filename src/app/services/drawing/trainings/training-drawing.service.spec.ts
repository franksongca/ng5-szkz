import { TestBed, inject } from '@angular/core/testing';

import { TrainingDrawingService } from './training-drawing.service';

describe('TrainingDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingDrawingService]
    });
  });

  it('should be created', inject([TrainingDrawingService], (service: TrainingDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
