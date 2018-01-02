/// <reference path='../../../node_modules/createjs-module/createjs.d.ts' />
import { Injectable, EventEmitter } from '@angular/core';
import { ProcessInterface, DeviceTimerService } from './device-timer.service';
import * as createjs from 'createjs-module';

export enum Oritation {
  Landscape = 0,
  Portrait
}

@Injectable()
export class CanvasService {
  private static _CanvasId = 'szkzCanvas';
  private static _WindowSize;
  private static _ResizeEventHabdler;
  private static _Stage;
  private static _CanvasSize = [
    {w: 910, h: 590},
    {w: 590, h: 910},
  ];
  private static _RealCanvasSize;
  private static _Oritation;
  private static _BackgroundColor = 'lightyellow';

  private onResized: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (CanvasService._Stage) {
      CanvasService._Stage.removeAllChildren();
    }

    if (!CanvasService._ResizeEventHabdler) {
      CanvasService._ResizeEventHabdler = this.onResized;
    }
  }

  static TriggerResizeEvent(size) {
    CanvasService._WindowSize = {
      w: size.w,
      h: size.h
    };

    if (size.w > size.h) {
      CanvasService._Oritation = Oritation.Landscape;
    } else {
      CanvasService._Oritation = Oritation.Portrait;
    }

    if (CanvasService._WindowSize.w > CanvasService._WindowSize.h) {
      CanvasService._Stage.scaleX = CanvasService._Stage.scaleY = CanvasService._Stage.scale = CanvasService._WindowSize.w / CanvasService._CanvasSize[Oritation.Landscape].w;
    } else {
      CanvasService._Stage.scaleX = CanvasService._Stage.scaleY = CanvasService._Stage.scale = CanvasService._WindowSize.w / CanvasService._CanvasSize[Oritation.Landscape].h;
    }

    CanvasService._RealCanvasSize = {
      w: CanvasService._WindowSize.w,
      h: CanvasService._CanvasSize[CanvasService.Oritation].h * CanvasService._Stage.scale
    };

    CanvasService._ResizeEventHabdler.emit({size: CanvasService.WindowSize, oritation: CanvasService._Oritation, canvasSize: CanvasService._RealCanvasSize});
  }

  static get WindowSize() {
    return CanvasService._WindowSize;
  }

  static get ResizeEventHabdler() {
    return CanvasService._ResizeEventHabdler;
  }

  static get CanvasSize() {
    return CanvasService._CanvasSize;
  }

  static get Oritation() {
    return CanvasService._Oritation;
  }

  static get Stage() {
    return CanvasService._Stage;
  }

  static set Stage(stage) {
    CanvasService._Stage = stage;
  }

  static get BackgroundColor() {
    return CanvasService._BackgroundColor;
  }

  static CreateStage() {
    if (!CanvasService._Stage) {
      CanvasService._Stage = new createjs.Stage(CanvasService._CanvasId);

      const process: ProcessInterface = {
        renderFunc: () => {
          CanvasService.UpdateStage();
        },
        totalLoops: 0,
        interval: 1
      };

      DeviceTimerService.register(process);
    }

    CanvasService._Stage.scaleX = CanvasService._Stage.scaleY = CanvasService._Stage.scale = 1;

    CanvasService.TriggerResizeEvent({
      w: window.innerWidth,
      h: window.innerHeight
    });
  }

  static UpdateStage() {
    if (CanvasService.IsCanvasReady()) {
      CanvasService._Stage.update();
    }
  }

  static get Scale() {
    return CanvasService._Stage.scale;
  }

  static IsCanvasReady() {
    return !!CanvasService._Stage;
  }

}
