/// <reference path='../../../../node_modules/createjs-module/createjs.d.ts' />
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleListService } from './../../services/sz/article-list.service';
import { ArticleService } from './../../services/sz/article.service';
import { DeviceTimerService } from './../../services/device-timer.service';
import { CommonService } from './../../services/common.service';
import { CanvasService } from './../../services/canvas.service';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  @ViewChild('funcEle') el: ElementRef;

  _win;
  fullScreen = false;

  @HostListener('window:resize') onResize($event) {
    CanvasService.TriggerResizeEvent({w: window.innerWidth, h: window.innerHeight});
  }

  constructor(
    private canvasService: CanvasService,
    private commonService: CommonService,
    private articleListService: ArticleListService,
    private articleService: ArticleService,
    private translateService: TranslateService
  ) {
    this._win = window;

    DeviceTimerService.init();

    ArticleListService.loadArticleList().subscribe((response) => {
      this.articleService.loadArticle(CommonService.productCode);
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('zh');
  }

  toggleHeader(e) {
    e.preventDefault();
    this.fullScreen = !this.fullScreen;
  }
}
