import { TestBed, inject } from '@angular/core/testing';

import { DeviceTimerService } from './device-timer.service';

describe('DeviceTimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceTimerService]
    });
  });

  it('should be created', inject([DeviceTimerService], (service: DeviceTimerService) => {
    expect(service).toBeTruthy();
  }));
});
