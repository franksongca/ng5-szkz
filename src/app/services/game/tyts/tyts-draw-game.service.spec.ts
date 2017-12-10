import { TestBed, inject } from '@angular/core/testing';

import { TytsDrawGameService } from './tyts-draw-game.service';

describe('DrawGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TytsDrawGameService]
    });
  });

  it('should be created', inject([TytsDrawGameService], (service: TytsDrawGameService) => {
    expect(service).toBeTruthy();
  }));
});
