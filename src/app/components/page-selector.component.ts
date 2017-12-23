import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceTimerService } from './../services/device-timer.service';
import { ArticleService } from './../services/sz/article.service';
import { CommonService } from './../services/common.service';
import { AudioLoaderService } from './../services/audio.manager.service';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageSelectorComponent implements AfterViewInit {
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

  showPageText = false;

  pageChanged(event: any): void {
    AudioLoaderService.play('changeSelection');
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.paginationSettings.currentPage = event.page;
    this.changeToPage();
  }

  changeToPage() {
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

  constructor(private articleService: ArticleService, private translate: TranslateService) {
    this.translate.get(['FIRST_PAGE', 'LAST_PAGE', 'PREVIOUS_PAGE', 'NEXT_PAGE']).subscribe((res) => {
      this.paginationSettings.translation = res;
    });
  }

  initData() {
    DeviceTimerService.register({
      renderFunc: () => {
        this.paginationSettings.currentPage = CommonService.getBookmark();
        if (CommonService.getBookmark() === 1) {
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
  }

}
