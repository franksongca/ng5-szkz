/// <reference path="../../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from '../drawing.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../services/common.service';
import { ProcessInterface, DeviceTimerService } from './../../../services/device-timer.service';

@Injectable()
export class TytsDrawingService extends DrawingService {
  static PLATE_ITEM_RADIUS = 35;
  static translate;

  static PenObject;
  static ColorPlateObject;
  static realPlateColors;

  constructor(private translateService: TranslateService) {
    super();

    TytsDrawingService.translate = translateService;
  }

  static bindHanziToPlate(characters) {
    TytsDrawingService.ColorPlateObject.Items.items.forEach((item) => {
      const index = item.colorIndex > characters.length - 1 ? item.colorIndex - characters.length + 1 : item.colorIndex;
      item.hanZi = characters[index];
      item.textObj.text = characters[index].word;
    });
  }


  static createColorPlateItem(item, fontFamily) {
    const color = TytsDrawingService.realPlateColors[item.colorIndex];

    if (!item.container) {
      item.container = new createjs.Container();
    }

    if (item.plateShape) {
      item.plateShape.clear();
    }

    item.plateShape = TytsDrawingService.createCircle(
      {thinkness: 1, stroke: color, fill: color},
      {pos: {x: TytsDrawingService.PLATE_ITEM_RADIUS, y: TytsDrawingService.PLATE_ITEM_RADIUS}, r: TytsDrawingService.PLATE_ITEM_RADIUS}
    );
    // item.plateShape.shadow = TytsDrawingService.createShadow({color: 'black', x: 0, y: 1,  blur: 1});

    item.textObj = TytsDrawingService.createText('字', {pos: {x: 9, y: 8}, fontSize: 50, color: 'white', fontFamily: fontFamily});
    item.textObj.shadow = TytsDrawingService.createShadow({color: 'black', x: 1, y: 1,  blur: 1});
    item.container.addChild(item.plateShape, item.textObj);


    item.container.mouseEnabled = true;
    item.container.cursor = 'pointer';

    return item.container;
  }

  static createColorPlate(options) {
    if (TytsDrawingService.ColorPlateObject && TytsDrawingService.ColorPlateObject.container) {
      TytsDrawingService.ColorPlateObject.container.clear();
    } else {
      TytsDrawingService.ColorPlateObject = {
        container: new createjs.Container()
      };
    }

    if (TytsDrawingService.ColorPlateObject.Items && TytsDrawingService.ColorPlateObject.Items.container) {
      TytsDrawingService.ColorPlateObject.Items.container.clear();

      TytsDrawingService.ColorPlateObject.Items.items.forEach((item) => {
        item.container.clear();
      });
    } else {
      TytsDrawingService.ColorPlateObject.Items = {
        container: new createjs.Container(),
        items: []
      };
    }

    TytsDrawingService.ColorPlateObject.container.addChild(TytsDrawingService.ColorPlateObject.Items.container);


    const bg = TytsDrawingService.createRect(
      {thinkness: 0, stroke: {r: 230, g: 240, b: 230, a: 1}, fill: {r: 230, g: 240, b: 230, a: 1}},
      {pos: {x: 10, y: 10}, size: {w: 220, h: 580}}
    );

    bg.shadow = TytsDrawingService.createShadow({color: '#99cc99', x: 2, y: 2, blur: 2});

    const plateIcon = TytsDrawingService.createBitmap({data: options.colorPlateIconData, cursor: 'default', scale: 0.4, pos: {x: 20, y: 20}});

    const ptTitle = TytsDrawingService.createText('hello', {pos: {x: 80, y: 30}, fontSize: 17, fontFamily: options.fontFamily});

    TytsDrawingService.translate.get('SELECT_APPROPRIATE_CORLOR').subscribe((res: string) => {
      ptTitle.text = res;
    });


    TytsDrawingService.ColorPlateObject.container.addChild(bg, plateIcon, ptTitle);

    const plateColors = CommonService.getRandomizedArray(options.plateColors); // array contains all available colors
    TytsDrawingService.realPlateColors = [];

    TytsDrawingService.ColorPlateObject.Items.items = new Array(options.colorNum);

    // 选前 options.fillInAreaNum 个颜色
    for (let c = 0; c < options.fillInAreaNum; c++) {
      TytsDrawingService.realPlateColors.push(plateColors[c]);
      TytsDrawingService.ColorPlateObject.Items.items[c] = {colorIndex: c};
    }

    // 不足颜色从已选颜色中随机选取，一共options.colorNum个颜色，对应色盘中颜色数目
    for (let r = 0; r < options.colorNum - options.fillInAreaNum; r++) {
      const nc = CommonService.getRandomNumber(0, options.fillInAreaNum - 1);

      TytsDrawingService.ColorPlateObject.Items.items[options.fillInAreaNum + r] = {colorIndex: nc};
    }

    // 随机排列色盘
    TytsDrawingService.ColorPlateObject.Items.items = CommonService.getRandomizedArray(TytsDrawingService.ColorPlateObject.Items.items);

    TytsDrawingService.ColorPlateObject.Items.items.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const nitem = TytsDrawingService.createColorPlateItem(item, options.fontFamily);

      nitem.x = 30 + col * 110;
      nitem.y = 70 + row * (TytsDrawingService.PLATE_ITEM_RADIUS + 2) * 2;



      nitem.mouseEnabled = true;
      nitem.cursor = 'pointer';
      nitem.addEventListener('mousedown', function(event) {
        TytsDrawingService.fillInk({color: 'white', wait: 10, duration: 10}, () => {
          TytsDrawingService.movePenTo(event['rawX'], event['rawY'], () => {
            const color = TytsDrawingService.realPlateColors[item.colorIndex];
            TytsDrawingService.fillInk({color: color, wait: 500, duration: 600});
          });
        });
      });

      TytsDrawingService.ColorPlateObject.container.addChild(nitem);
    });



    TytsDrawingService.ColorPlateObject.container.x = options.pos.x;
    return TytsDrawingService.ColorPlateObject.container;
  }

  static createPenBrash(options) {
    if (TytsDrawingService.PenObject && TytsDrawingService.PenObject.container) {
      TytsDrawingService.PenObject.container.clear();
    }

    const pen = TytsDrawingService.createBitmap({data: options.penData, cursor: 'default', scale: 1});

    const b = new createjs.Shape();
    b.graphics.beginFill('lightgray');
    b.graphics.setStrokeStyle(1);
    b.graphics.beginStroke('black');
    b.graphics.moveTo(10, 0);
    b.graphics.quadraticCurveTo(4, 40, 18, 60);
    b.graphics.quadraticCurveTo(36, 40, 26, 0);
    b.graphics.lineTo(10, 0);

    b.scaleX = 0.3;
    b.scaleY = 0.4;

    b.x = 61;
    b.y = 100;

    const d = new createjs.Shape();
    d.graphics.setStrokeStyle(0);
    // d.graphics.beginStroke(DrawingService.getRGB('green'));
    const cmd = d.graphics.beginFill(TytsDrawingService.getRGB('green'));
    d.graphics.drawRect(0, 0, 12, 24);
    d.x = 60;
    d.y = 124;  // 100~124;

    const c = new createjs.Shape();
    c.graphics.beginFill('black');
    c.graphics.beginStroke('black');
    c.graphics.moveTo(10, 0);
    c.graphics.quadraticCurveTo(4, 40, 18, 60);
    c.graphics.quadraticCurveTo(36, 40, 26, 0);
    c.graphics.lineTo(10, 0);

    c.scaleX = 0.3;
    c.scaleY = 0.4;

    c.x = 61;
    c.y = 100;

    d.mask = c;

    TytsDrawingService.PenObject = {
      container: new createjs.Container(),
      ink: d,
      fillCmd: cmd,
      point: {left: -3, top: 140}
    };

    TytsDrawingService.PenObject.container.addChild(b, d, pen);

    TytsDrawingService.PenObject.container.rotation = 30;
    return TytsDrawingService.PenObject['container'];
  }

  static fillInk(options, callback?) {
    TytsDrawingService.PenObject.color = options.color;
    TytsDrawingService.PenObject.ink.graphics.setStrokeStyle(0);
    TytsDrawingService.PenObject.ink.graphics.beginFill(TytsDrawingService.getRGB(options.color));
    TytsDrawingService.PenObject.ink.graphics.drawRect(0, 0, 12, 24);
    TytsDrawingService.Stage.update();

    createjs.Tween.get(TytsDrawingService.PenObject.ink)
      .wait(options.wait ? options.wait : 170)
      .to({y: 100}, options.duration ? options.duration : 500)
      .call(() => {
        TytsDrawingService.PenObject['ink'].y = 100;
        if (callback) {
          callback();
        }
      });
  }

  static movePenTo(x, y, callback?) {
    createjs.Tween.get(TytsDrawingService.PenObject.container)
      .wait(50)
      .to({
        x: x - TytsDrawingService.PenObject.point.left,
        y: y - TytsDrawingService.PenObject.point.top
        }, 500
      ).call(() => {
      if (callback) {
        callback();
      }
      // TytsDrawingService.emptyInk(callback);
    });
  }

  static emptyInk(callback?) {
    TytsDrawingService.PenObject.color = '';

    createjs.Tween.get(TytsDrawingService.PenObject.ink)
      .wait(170)
      .to({y: 124}, 400)
      .call(() => {
        TytsDrawingService.PenObject['ink'].y = 124;
        if (callback) {
          callback();
        }
      });
  }

  static createLines(linesData, linesConfig, index, name, shape?) {
    const lines = shape ? shape : new createjs.Shape();

    lines.graphics.clear();

    const boundary = {
      minX: 10000, maxX: 0, minY: 10000, maxY: 0
    };

    lines.graphics.beginStroke(TytsDrawingService.getRGB(linesConfig.stroke));
    lines.graphics.setStrokeStyle(linesConfig.thickness);
    linesData.forEach((line) => {
      if (line.start.x < boundary.minX) {
        boundary.minX = line.start.x;
      }
      if (line.end.x > boundary.maxX) {
        boundary.maxX = line.end.x;
      }
      if (line.start.y < boundary.minY) {
        boundary.minY = line.start.y;
      }
      if (line.end.y > boundary.maxY) {
        boundary.maxY = line.end.y;
      }

      lines.graphics.moveTo(line.start.x, line.start.y);
      lines.graphics.lineTo(line.end.x, line.end.y);
    });
    lines.graphics.endStroke();

    lines.setBounds(boundary.minX, boundary.minY, boundary.maxX - boundary.minX, boundary.maxY - boundary.minY);
    return {shape: lines, index: index, name: name, size: {width: boundary.maxX - boundary.minX, height: boundary.maxY - boundary.minY}};
  }


}
