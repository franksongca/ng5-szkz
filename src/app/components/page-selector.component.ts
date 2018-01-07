import { Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceTimerService } from './../services/device-timer.service';
import { ArticleService } from './../services/sz/article.service';
import { CommonService } from './../services/common.service';
import { CanvasService } from './../services/canvas.service';
import { AudioLoaderService } from './../services/audio.manager.service';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageSelectorComponent implements AfterViewInit, OnDestroy {
  static maxSize = [
    {w: 520, size: 1},
    {w: 570, size: 2},
    {w: 610, size: 3},
    {w: 680, size: 4}
  ];

  paginationSettings = {
    bigTotalItems: 0,
    currentPage: 1,
    maxSize: 5,
    itemsPerPage: 1,
    numPages: 1,
    translation: {}
  };
  articleInfo = {
    title: '',
    pageText: ''
  };

  firstTime = true;
  winSize;
  showPageText = false;

  pageChanged(event: any): void {
    if (this.paginationSettings.currentPage === event.page && !this.firstTime) {
     return;
    }
    this.firstTime = false;

    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.paginationSettings.currentPage = event.page;
    this.changeToPage();
  }

  changeToPage() {
    if (!this.winSize) {
      return;
    }
    AudioLoaderService.play('changeSelection');
    CommonService.setBookmark(this.paginationSettings.currentPage);
    this.articleService.changeToPage(this.paginationSettings.currentPage);

    this.articleInfo.pageText = this.articleService.getPageText(this.paginationSettings.currentPage - 1);
    this.showPageText = true;

    DeviceTimerService.register({
      renderFunc: () => {
        this.showPageText = false;
      },
      totalLoops: 1,
      interval: 100
    });

  }

  constructor(private canvasService: CanvasService, private commonService: CommonService, private articleService: ArticleService, private translate: TranslateService) {
    this.translate.get(['firstPage', 'lastPage', 'previousPage', 'nextPage']).subscribe((res) => {
      this.paginationSettings.translation = res;
    });

    CanvasService.ResizeEventHabdler.subscribe((sizeAndOrtation) => {
      this.onResize(sizeAndOrtation.size);
    });
  }

  onResize(size?) {
    if (size) {
      this.winSize = size;
    } else {
      this.winSize = CanvasService.WindowSize;
    }

    setTimeout(() => {
      if (this.winSize) {
        this.paginationSettings.maxSize = this.getPaginationMaxSize(this.winSize.w);
      }
    });

  }

  getPaginationMaxSize(winWidth) {
    if (winWidth > PageSelectorComponent.maxSize[3].w) {
      return 5;
    }
    if (winWidth > PageSelectorComponent.maxSize[2].w) {
      return 4;
    }
    if (winWidth > PageSelectorComponent.maxSize[1].w) {
      return 3;
    }
    if (winWidth > PageSelectorComponent.maxSize[0].w) {
      return 2;
    }
    return 1;

  }



  initData() {
    DeviceTimerService.register({
      renderFunc: () => {
        this.paginationSettings.currentPage = CommonService.getBookmark();
        if (CommonService.getBookmark() === 1 && this.firstTime) {
          this.firstTime = false;
          this.changeToPage();
        }
      },
      totalLoops: 1,
      interval: 1
    });

    this.paginationSettings.bigTotalItems = this.articleService.getTotalPages();
    this.articleInfo.title = '《' + this.articleService.getArticleInfo().title.hz + '》'; /// TODO: lang
    this.articleInfo.pageText = this.articleService.getPageText(this.paginationSettings.currentPage - 1);
  }

  ngAfterViewInit() {
    if (this.articleService.isLoaded()) {
      this.initData();
    } else {
      this.articleService.onArticleLoaded.subscribe(() => {
        this.initData.apply(this);
      });
    }

    this.onResize();
  }

  ngOnDestroy() {
    this.paginationSettings = {
      bigTotalItems: 0,
      currentPage: 1,
      maxSize: 5,
      itemsPerPage: 1,
      numPages: 1,
      translation: {}
    };
    this.articleInfo = {
      title: '',
      pageText: ''
    };

    this.winSize = undefined;
    this.showPageText = false;

    this.firstTime = true;
  }

}
