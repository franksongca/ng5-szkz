/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ProcessInterface, DeviceTimerService } from './../../services/device-timer.service';
import { ZiDrawingService } from './../../services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './../../services/drawing/pinyin.drawing.service';

@Injectable()
export class HanziDrawingService extends createjs.Container  {
  character;
  stylesSettings;
  ziObj;
  pinyinObj;

  constructor() {
    super();

    DeviceTimerService.init();
  }

  createHanzi(character: any, stylesSettings: any) {
    this.character = character;
    this.stylesSettings = stylesSettings;

    this.ziObj = new ZiDrawingService();
    this.ziObj.createHz(this.character.hanZi, this.stylesSettings);

    this.ziObj.x = 1;
    this.ziObj.y = this.stylesSettings.pinyinOptions.lineDist * 3 + this.stylesSettings.pinyinOptions.marginTop;

    this.pinyinObj = new PinyinDrawingService();
    this.pinyinObj.createPinyin(this.character.pinyinObj, this.stylesSettings.pinyinOptions);
    this.pinyinObj.x = 1;
    this.pinyinObj.y = 1;
    this.addChild(this.pinyinObj);
    this.addChild(this.ziObj);
  }

  changeZiColor(color) {
    this.ziObj.changeZiColor(color);
  }

  changeShengMuColor(color) {
    this.pinyinObj.changeShengMuColor(color);
  }

  changeYunMuColor(color) {
    this.pinyinObj.changeYunMuColor(color);
  }

  resumeZiColor() {
    this.ziObj.resumeZiColor();
  }

  ziColorFlicking(stage, colors, times, interval, callback?) {
    let indexColor = 0;

    const flicking: Function = () => {
      const c = colors[indexColor];
      this.changeZiColor(c);
      stage.update();
      if (++indexColor > colors.length - 1) {
        indexColor = 0;
      }
    };

    const complete: Function = () => {
      this.resumeZiColor();
      stage.update();
      if (callback) {
        callback();
      }
    };

    const process: ProcessInterface = {
      renderFunc: flicking,
      completeFunc: complete,
      totalLoops: times,
      interval: interval
    };

    DeviceTimerService.register(process);
  }
}
