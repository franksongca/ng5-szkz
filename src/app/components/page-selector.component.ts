import { Component, ViewEncapsulation, OnInit } from '@angular/core';

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
    nextText: '后一页'
  };
  pageText = '人之初，性本善。性相近，习相远。';


  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
  constructor() { }

  ngOnInit() {
  }

}
