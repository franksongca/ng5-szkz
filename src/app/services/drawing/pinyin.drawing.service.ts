/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from './drawing.service';
@Injectable()
export class PinyinDrawingService extends createjs.Container {
  lines;
  letters;
  pinyinConfig;

  constructor() {
    super();
  }

  createPinyin(pinyinInfo, pinyinConfig) {
    // let lettersNum = pinyinInfo.length;
    this.pinyinConfig = pinyinConfig;
    this.letters = pinyinInfo;
    this.lines = DrawingService.createPinyinLines(pinyinConfig);

    this.addChild(this.lines);

    const margin = (pinyinConfig.size.w - this.letters.length * pinyinConfig.lineDist) / 2;
    this.letters.forEach((l, index) => {
      const py = DrawingService.createText(l.letter, {
        color: l.type === 's' ? pinyinConfig.shengMuColor : pinyinConfig.yunMuColor,
        fontSize: pinyinConfig.fontSize,
        fontFamily: pinyinConfig.fontFamily,
        pos: {x: margin + index * pinyinConfig.lineDist, y: pinyinConfig.top}
      });
      l.letterObj  = py;
      this.addChild(py);
    });
  }

  changeShengMuColor(color) {
    this.letters.forEach((l) => {
      if (l.type === 's') {
        l.letterObj.color = color;
      }
    });
  }

  changeYunMuColor(color) {
    this.letters.forEach((l) => {
      if (l.type === 'y' || l.type === 'yt') {
        l.letterObj.color = color;
      }
    });
  }

  resumeShengMuColor() {
    this.changeShengMuColor(this.pinyinConfig.shengMuColor);
  }

  resumeYunMuColor() {
    this.changeYunMuColor(this.pinyinConfig.yunMuColor);
  }

}
