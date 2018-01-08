import { TestBed, inject } from '@angular/core/testing';

import { ListeningDrawingService } from './listening-drawing.service';

describe('ListeningDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListeningDrawingService]
    });
  });

  it('should be created', inject([ListeningDrawingService], (service: ListeningDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
