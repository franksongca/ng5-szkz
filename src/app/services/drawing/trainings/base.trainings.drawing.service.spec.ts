import { TestBed, inject } from '@angular/core/testing';

import { BaseTrainingsDrawingService } from './base.trainings.drawing.service';

describe('BaseTrainingsDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseTrainingsDrawingService]
    });
  });

  it('should be created', inject([BaseTrainingsDrawingService], (service: BaseTrainingsDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
