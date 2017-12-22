/// <reference path="../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable, EventEmitter } from '@angular/core';
import { Howl } from 'howler';


@Injectable()
export class AudioLoaderService {

  onAudioLoaded: EventEmitter<any> = new EventEmitter();
  onQueueLoaded: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  loadQueue(menifest) {
  }

  play(id) {
  }

  reset() {
  }
}
