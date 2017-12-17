import { TestBed, inject } from '@angular/core/testing';

import { TytsDrawingService } from './tyts-drawing.service';

describe('TytsDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TytsDrawingService]
    });
  });

  it('should be created', inject([TytsDrawingService], (service: TytsDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
