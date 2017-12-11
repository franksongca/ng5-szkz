import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  static productCode = 'kj-SZJ';

  static TICK = 0.0167; // 1/60 seconds, 16.7 milliseconds
  constructor() { }

  static clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  static getTimestamp() {
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); };
    }

    return Date.now();
  }

  static setBookmark(n, prod?) {
    if (!prod) {
      prod = CommonService.productCode;
    }

    localStorage.setItem('__bookmark__' + prod + '__', n);
  }

  static getBookmark(prod?) {
    if (!prod) {
      prod = CommonService.productCode;
    }
    const bk = localStorage.getItem('__bookmark__' + prod + '__');

    return bk ? Number(bk) : 1;
  }
}
