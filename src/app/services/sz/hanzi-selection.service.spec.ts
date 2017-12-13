import { TestBed, inject } from '@angular/core/testing';

import { HanziSelectionService } from './hanzi-selection.service';

describe('Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HanziSelectionService]
    });
  });

  it('should be created', inject([HanziSelectionService], (service: HanziSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
