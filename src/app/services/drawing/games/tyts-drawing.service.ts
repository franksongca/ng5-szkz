/// <reference path="../../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DrawingService } from '../drawing.service';

@Injectable()
export class SzkzDrawingService extends DrawingService {

  constructor() {
    super();
  }

}
