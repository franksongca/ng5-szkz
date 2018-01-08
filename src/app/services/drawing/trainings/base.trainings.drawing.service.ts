/// <reference path="../../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from '../drawing.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../common.service';
import { CanvasService, Oritation } from '../../canvas.service';
import { AudioLoaderService } from './../../audio.manager.service';

@Injectable()
export class BaseTrainingsDrawingService extends DrawingService {
  translateService: TranslateService;
  commonService: CommonService;
  canvasService: CanvasService;

  constructor(
) {
    super();
  }
}
