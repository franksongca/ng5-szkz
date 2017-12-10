/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ProcessInterface, DeviceTimerService } from './../../services/device-timer.service';

@Injectable()
export class DrawingService {
  static PenObject;
  static Stage;

  constructor() {
  }

  static createCircle(drwaingSettings, shapeSettings) {
    const circle = new createjs.Shape();

    circle.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawCircle(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.r);

    return circle;
  }

  static createGridSquare(drwaingSettings, shapeSettings) {
    const gridSquare = new createjs.Shape();

    gridSquare.graphics.setStrokeStyle(drwaingSettings.zi.grid.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.zi.grid.hzBoxBorder))
      .beginFill(DrawingService.getRGB(drwaingSettings.zi.grid.fill))
      .drawRect(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.w);

    gridSquare.graphics.setStrokeDash(drwaingSettings.zi.grid.dot);
    gridSquare.graphics.beginStroke(DrawingService.getRGB(drwaingSettings.zi.grid.dottedLineColor));
    gridSquare.graphics.moveTo(shapeSettings.pos.x, shapeSettings.pos.y + shapeSettings.size.w / 2);
    gridSquare.graphics.lineTo(shapeSettings.pos.x + shapeSettings.size.w, shapeSettings.pos.y + shapeSettings.size.w / 2);
    gridSquare.graphics.moveTo(shapeSettings.pos.x + shapeSettings.size.w / 2, shapeSettings.pos.y);
    gridSquare.graphics.lineTo(shapeSettings.pos.x + shapeSettings.size.w / 2, shapeSettings.pos.y + shapeSettings.size.w);

    return gridSquare;
  }

  static createSquare(drwaingSettings, shapeSettings) {
    const square = new createjs.Shape();

    square.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.w);

    return square;
  }

  static createRect(drwaingSettings, shapeSettings) {
    const rect = new createjs.Shape();

    rect.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.h);

    return rect;
  }

  static createText(text: string, config: any) {
    const t = new createjs.Text(text, config.fontSize + 'px ' + config.fontFamily, config.color);
    t.x = config.pos ? config.pos.x : 0;
    t.y = config.pos ? config.pos.y : 0;

    return t;
  }

  static createPinyinLines(linesConfig) {
    const lines = new createjs.Shape();
    let line = 0;

    lines.graphics.beginStroke(DrawingService.getRGB(linesConfig.stroke));
    lines.graphics.setStrokeStyle(linesConfig.thickness);
    while (line < 4) {
      lines.graphics.moveTo(0, line * linesConfig.lineDist);
      lines.graphics.lineTo(linesConfig.size.w, line * linesConfig.lineDist);
      line ++;
    }

    return lines;
  }

  static createLines(linesData, linesConfig, index, name, shape?) {
    const lines = shape ? shape : new createjs.Shape();

    lines.graphics.clear();

    const boundary = {
      minX: 10000, maxX: 0, minY: 10000, maxY: 0
    };

    lines.graphics.beginStroke(DrawingService.getRGB(linesConfig.stroke));
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

  static createBitmap(options) {
    const img = new Image();
    img.src = options.data;
    const btm = new createjs.Bitmap(img);
    btm.cursor = options.cursor ? options.cursor : 'default';
    btm.scaleX = btm.scaleY = options.scale ? options.scale : 1;

    return btm;
  }

  // static createPenBrash(options) {
  //   const c = new createjs.Shape();
  //   c.graphics.beginFill(options.fill);
  //   c.graphics.beginStroke(options.stroke);
  //   c.graphics.moveTo(10, 0);
  //   c.graphics.quadraticCurveTo(4, 40, 18, 60);
  //   c.graphics.quadraticCurveTo(36, 40, 26, 0);
  //   c.graphics.lineTo(10, 0);
  //
  //   return c;
  // }

  static createPenBrash(options) {
    if (DrawingService.PenObject && DrawingService.PenObject.container) {
      DrawingService.PenObject.container.clear();
    }

    const pen = DrawingService.createBitmap({data: options.penData, cursor: 'default', scale: 1});

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
    const cmd = d.graphics.beginFill(DrawingService.getRGB('green'));
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

    DrawingService.PenObject = {
      container: new createjs.Container(),
      ink: d,
      fillCmd: cmd,
      point: {left: -3, top: 140}
    };

    DrawingService.PenObject.container.addChild(b, d, pen);

    DrawingService.PenObject.container.rotation = 30;
    return DrawingService.PenObject['container'];
  }

  static fillInk(color, callback?) {
    DrawingService.PenObject.color = color;
    DrawingService.PenObject.ink.graphics.setStrokeStyle(0);
    // d.graphics.beginStroke(DrawingService.getRGB('green'));
    DrawingService.PenObject.ink.graphics.beginFill(DrawingService.getRGB(color));
    DrawingService.PenObject.ink.graphics.drawRect(0, 0, 12, 24);


    createjs.Tween.get(DrawingService.PenObject.ink)
      .wait(70)
      .to({y: 100}, 400)
      .call(() => {
        DrawingService.PenObject['ink'].y = 100;
        if (callback) {
          callback();
        }
      });
  }

  static movePenTo(x, y, callback?) {
    createjs.Tween.get(DrawingService.PenObject.container)
      .wait(50)
      .to({
        x: x - DrawingService.PenObject.point.left,
        y: y - DrawingService.PenObject.point.top}, 700
      ).call(() => {
      if (callback) {
        callback();
      }
      // DrawingService.emptyInk(callback);
    });
  }

  static emptyInk(callback?) {
    DrawingService.PenObject.color = '';

    createjs.Tween.get(DrawingService.PenObject.ink)
      .wait(170)
      .to({y: 124}, 400)
      .call(() => {
        DrawingService.PenObject['ink'].y = 124;
        if (callback) {
          callback();
        }
      });
  }


  // make sure bitmap is rendering
  static setupStage(stage) {
    DrawingService.Stage = stage;
    const process: ProcessInterface = {
      renderFunc: () => {
        DrawingService.Stage.update();
      },
      totalLoops: 0,
      interval: 1
    };

    DeviceTimerService.register(process);
  }

  private static getRGB(colorValue) {
    if (typeof colorValue !== 'string') {
      colorValue = createjs.Graphics.getRGB(colorValue.r, colorValue.g, colorValue.b, colorValue.a ? colorValue.a : 1);
    }
    return colorValue;
  }
}
