import { TestBed, inject } from '@angular/core/testing';

import { PinyinService } from './pinyin.service';

describe('PinyinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinyinService]
    });
  });

  xit('should be created', inject([PinyinService], (service: PinyinService) => {
    expect(service).toBeTruthy();
  }));
});
