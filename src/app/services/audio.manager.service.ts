/// <reference path="../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable, EventEmitter } from '@angular/core';
import * as createjs from 'createjs-module';


@Injectable()
export class AudioLoaderService {

  onAudioLoaded: EventEmitter<any> = new EventEmitter();
  onQueueLoaded: EventEmitter<any> = new EventEmitter();
  queue;

  constructor() {
    this.queue = new createjs.LoadQueue(true);
    this.queue.installPlugin(createjs.Sound);

    this.queue.on('fileload', (event) => {
      this.onAudioLoaded.emit({id: event['id'], src: event['src']});
    }, this);

    this.queue.on('complete', (event) => {
      this.onQueueLoaded.emit();
    }, this);
  }

  loadQueue(menifest) {
    this.queue.loadManifest(menifest);
  }

  play(id) {
    createjs.Sound.play(id);
  }

  reset() {
    this.queue.removeAll();
    createjs.Sound.removeAllSounds();
  }
}
