import { TestBed, inject } from '@angular/core/testing';

import { PinyinService } from './pinyin.drawing.service';

describe('PinyinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinyinService]
    });
  });

  it('should be created', inject([PinyinService], (service: PinyinService) => {
    expect(service).toBeTruthy();
  }));
});
