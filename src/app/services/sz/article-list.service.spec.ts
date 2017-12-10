import { TestBed, inject } from '@angular/core/testing';

import { ArticleListService } from './../sz/article-list.service';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleListService]
    });
  });

  xit('should be created', inject([ArticleListService], (service: ArticleListService) => {
    expect(service).toBeTruthy();
  }));
});
