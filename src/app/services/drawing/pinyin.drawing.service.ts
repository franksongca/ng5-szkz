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
    this.lines = DrawingService.createPinyinLines(pinyinConfig);

    this.addChild(this.lines);

    if (!pinyinInfo) {
      return;
    }

    this.letters = pinyinInfo;

    let accumlatedWidth = 0;

    const lettersContainer = DrawingService.createContainer();

    this.letters.forEach((l, index) => {
      const py = DrawingService.createText(l.letter, {
        color: l.type === 's' ? pinyinConfig.shengMuColor : pinyinConfig.yunMuColor,
        fontSize: pinyinConfig.fontSize,
        fontFamily: pinyinConfig.fontFamily,
        pos: {x: accumlatedWidth, y: pinyinConfig.top}
      });


      l.letterObj  = py;

      accumlatedWidth += py.getMeasuredWidth() + pinyinConfig.letterDist;
      lettersContainer.addChild(py);
    });

    lettersContainer.x = (pinyinConfig.size.w - accumlatedWidth) / 2;
    this.addChild(lettersContainer);
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
