/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from './drawing.service';

@Injectable()
export class ZiDrawingService extends createjs.Container {
  bgGridObj;
  ziObj;
  stylesSettings;

  constructor() {
    super();
  }

  createHz(hzText: string, stylesSettings: any) {
    this.stylesSettings = stylesSettings;
    const shapeSettings = {
      pos: {x: 0, y: 0},
      size: {
        w: this.stylesSettings.zi.width,
        h: this.stylesSettings.zi.width
      }
    };

    this.bgGridObj = DrawingService.createGridSquare(this.stylesSettings, shapeSettings);
    this.ziObj = DrawingService.createText(hzText, {
      pos: {x: this.stylesSettings.zi.hzPadding, y: this.stylesSettings.zi.hzPadding},
      fontSize: this.stylesSettings.zi.width - this.stylesSettings.zi.hzPadding * 2,
      color: this.stylesSettings.zi.hzColor,
      fontFamily: this.stylesSettings.zi.fontFamily
    });

    this.addChild(this.bgGridObj);
    this.addChild(this.ziObj);
  }

  changeZiColor(color) {
    this.ziObj.color = color;
  }

  resumeZiColor() {
    this.changeZiColor(this.stylesSettings.zi.hzColor);
  }

}
