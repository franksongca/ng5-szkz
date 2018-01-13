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
        'hzMargin': 5,
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
        },
        'letterDist': 2
      }
    }
  };

  translateService: TranslateService;
  commonService: CommonService;
  canvasService: CanvasService;
  hanziDrawingService: HanziDrawingService;

  canvasSize;
  containerHanzi;
  hanziCollection;

  subscription;

  constructor() {
    super();
  }

  drawHanzi(collection?) {
    if (!this.subscription) {
      this.subscription = CanvasService.ResizeEventHabdler.subscribe((sizeAndOrtation) => {
        if (this.hanziCollection) {
          this.canvasSize = sizeAndOrtation.canvasSize;
          this.drawHanzi();
        }
      });
    }

    if (collection) {
      this.hanziCollection = collection;
    }

    CanvasService.Stage.removeAllChildren();
    this.containerHanzi = BaseTrainingsDrawingService.createContainer();

    const size = CanvasService.WindowSize;
    let charsLines = 8;

    if (size.w <= size.h) {
      charsLines = 4;
    }

    let startY = 0;
    let rowIndex = 0;
    let lineIndex = 0;

    const containerLine = [];

    containerLine[lineIndex] = BaseTrainingsDrawingService.createContainer();

    this.hanziCollection.forEach((hz, index) => {
      const hzDrawing = new HanziDrawingService();

      hzDrawing.createHanzi(hz, BaseTrainingsDrawingService.LayoutSettings);

      hzDrawing.x = rowIndex * (BaseTrainingsDrawingService.LayoutSettings.stylesSettings.zi.width + BaseTrainingsDrawingService.LayoutSettings.stylesSettings.zi.hzMargin);
      hzDrawing.y = 0;

      containerLine[lineIndex].addChild(hzDrawing);

      // this.containerHanzi.addChild(hzDrawing);
      if ((rowIndex + 1) % charsLines === 0) {
        containerLine[lineIndex].y = startY;
        this.containerHanzi.addChild(containerLine[lineIndex]);

        if (index < this.hanziCollection.length - 1) {
          lineIndex ++;
          containerLine[lineIndex] = BaseTrainingsDrawingService.createContainer();

          rowIndex = 0;
          startY += BaseTrainingsDrawingService.LayoutSettings.stylesSettings.zi.width +
            BaseTrainingsDrawingService.LayoutSettings.stylesSettings.zi.hzMargin +
            BaseTrainingsDrawingService.LayoutSettings.stylesSettings.pinyinOptions.lineDist * 3 +
            BaseTrainingsDrawingService.LayoutSettings.stylesSettings.pinyinOptions.marginTop;
        }
      } else {
        rowIndex ++;
      }
    });




    // this.containerHanzi.scaleX = this.containerHanzi.scaleY = this.containerHanzi.scale = this.containerHanzi.scaleX / CanvasService.Stage.scale;


    let marginLeft = 30;

    if (size.w < BaseTrainingsDrawingService.EXTRA_SMALL_DEVICE_WIDTH) {
      marginLeft = 5;
    } else if (size.w < BaseTrainingsDrawingService.EXTRA_SMALL_DEVICE_WIDTH) {
      marginLeft = 15;
    }

    const realWidth = size.w / CanvasService.Stage.scale - 2 * marginLeft - 10;
    const bd = this.containerHanzi.getBounds();

    this.containerHanzi.x = marginLeft;

    const scale = realWidth / bd.width;
    this.containerHanzi.scaleX = this.containerHanzi.scaleY = this.containerHanzi.scale = scale;

    const restHeight = (CanvasService.CanvasSize.h / CanvasService.Stage.scale - bd.height) / (lineIndex + 3);

    containerLine.forEach((cl, index) => {
      cl.y = index * (containerLine[0].getBounds().height + restHeight);
    });

    this.containerHanzi.y = restHeight / 4;

    CanvasService.Stage.addChild(this.containerHanzi);
  }

  destroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

}
