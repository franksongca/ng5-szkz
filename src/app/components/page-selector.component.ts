import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProcessInterface, DeviceTimerService } from './../services/device-timer.service';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageSelectorComponent implements OnInit {
  paginationSettings = {
    bigTotalItems: 93,
    bigCurrentPage: 1,
    maxSize: 5,
    itemsPerPage: 1,
    numPages: 0,
    firstText: '首页',
    lastText: '尾页',
    previousText: '前一页',
    nextText: '后一页',
    currentPage: 1
  };
  articleInfo = {
    title: '《三字经》',
    pageText: '人之初，性本善。性相近，习相远。'
  };

  showPageText = false;


  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);

    this.showPageText = true;

    DeviceTimerService.register({
      renderFunc: () => {
        this.showPageText = false;
      },
      totalLoops: 1,
      interval: 100
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
