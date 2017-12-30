import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CommonService {
  static productCode = 'kj-SZJ';
  static TICK = 0.0167; // 1/60 seconds, 16.7 milliseconds

  static FirstTime = true;

  constructor() {
  }

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

  // from <= return number < end
  static getRandomNumber(from: number, end: number): number {
    const t: number = Math.floor(Math.random() * (end - from));
    return t + from;
  }

  // randomize array
  static getRandomizedArray(arr: Array<any>): Array<any> {
    for (let i = 0; i < arr.length; i++) {
      const sw: Array<any> = CommonService.getPairedRandomNumber(0, arr.length);
      arr = CommonService.switchArrayElements(arr, Number(sw[0]), Number(sw[1]));
    }

    return arr;
  }

  static getPairedRandomNumber(from: number, end: number): Array<any> {
    const w1: number = CommonService.getRandomNumber(from, end);
    let w2: number = CommonService.getRandomNumber(from, end);
    while (w1 === w2) {
      w2 = CommonService.getRandomNumber(from, end);
    }
    return([w1, w2]);
  }

  static getMiniValueFromArray(arr: Array<number>): number {
    let mini: number = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < mini) {
        mini = arr[i];
      }
    }

    return mini;
  }

  static switchArrayElements(arr: Array<any>, ele1: number, ele2: number): Array<any> {
    const t = arr[ele1];
    arr[ele1] = arr[ele2];
    arr[ele2] = t;

    return arr;
  }

  // 检查是否是中文
  static isChinese(con: string): boolean {
    const pattern: RegExp = /[\u4e00-\u9fa5]/;
    const p: boolean = pattern.test(con);

    return p;
  }



}
