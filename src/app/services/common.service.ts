import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  static TICK = 0.0167; // 1/60 seconds, 16.7 milliseconds
  constructor() { }

  static clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  static getTimestamp() {
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }

    return Date.now();
  }
}
