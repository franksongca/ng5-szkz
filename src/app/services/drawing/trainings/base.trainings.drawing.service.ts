/// <reference path='../../../../../node_modules/createjs-module/createjs.d.ts' />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from '../drawing.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../common.service';
import { CanvasService, Oritation } from '../../canvas.service';
import { HanziDrawingService } from '../../../services/drawing/hanzi.drawing.service';
import { AudioLoaderService } from './../../audio.manager.service';

@Injectable()
export class BaseTrainingsDrawingService extends DrawingService {
  static LayoutSettings = {
    'gameConfig': {
      'w': 910,
      'h': 590,
      'backgroundColor': 'lightyellow'
    },
    'stylesSettings': {
      'zi': {
        'errorFlashing': [
          'red',
          'white'
        ],
        'successFlashing': [
          'green',
          'WHITE'
        ],
        'normalFlashing': [
          'yellow',
          'blue'
        ],
        'width': 100,
        'fontFamily': '楷体',
        'hzColor': 'blue',
        'hzPadding': 3,
        'grid': {
          'thickness': 1,
          'hzBoxBorder': 'red',
          'fill': 'yellow',
          'dot': [
            2,
            1
          ],
          'dottedLineColor': {
            'r': 255,
            'g': 0,
            'b': 0,
            'a': 0.5
          }
        }
      },
      'pinyinOptions': {
        'marginTop': 10,
        'thickness': 0.3,
        'top': 4,
        'lineDist': 14,
        'fontSize': 26,
        'stroke': 'black',
        'shengMuColor': 'red',
        'yunMuColor': 'green',
        'fontFamily': 'Arial',
        'size': {
          'w': 100
        }
      }
    }
  };

  translateService: TranslateService;
  commonService: CommonService;
  canvasService: CanvasService;
  hanziDrawingService: HanziDrawingService;

  containerHanzi;

  constructor() {
    super();

    this.containerHanzi = BaseTrainingsDrawingService.createContainer();
  }

  drawHanzi(collection) {
    collection.forEach((hz) => {
      const hzDrawing = new HanziDrawingService();

      hzDrawing.createHanzi(hz, BaseTrainingsDrawingService.LayoutSettings);

      this.containerHanzi.addChild(hzDrawing);
    });

    CanvasService.Stage.addChild(this.containerHanzi);
  }


}