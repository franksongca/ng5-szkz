/// <reference path='../../node_modules/createjs-module/createjs.d.ts' />
import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { DeviceTimerService } from './services/device-timer.service';
import { CommonService } from './services/common.service';
import { CanvasService } from './services/canvas.service';
import * as createjs from 'createjs-module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {


  constructor(private canvasService: CanvasService, private commonService: CommonService, private articleListService: ArticleListService, private articleService: ArticleService, private translateService: TranslateService) {




    DeviceTimerService.init();

    ArticleListService.loadArticleList().subscribe((response) => {
      this.articleService.loadArticle(CommonService.productCode);
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('zh');
  }

  ngAfterViewInit() {
    // const ctrlElementHeight = this.el.nativeElement.offsetHeight;

  }
}
