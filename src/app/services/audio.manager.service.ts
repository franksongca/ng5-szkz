/// <reference path="../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable, EventEmitter } from '@angular/core';
import { Howl } from 'howler';
import { CommonService } from './common.service';


@Injectable()
export class AudioLoaderService {
  static AudioBasePath = './assets/media/audioEffects/';

  static audioSources = {
    changeSelection: 'changeSelection.mp3',
    click: 'click.wav',
    ink: 'ink.mp3',
    error: ['wrong0.wav', 'wrong1.wav', 'wrong2.wav', 'wrong3.wav'],
    correct: ['correct0.wav', 'correct1.wav', 'correct2.wav'],
    splash: 'splash.wav',
    sliding: 'sliding.wav',
    claping: ['claping0.wav', 'claping1.wav', 'claping2.wav'],
    success: ['success0.wav', 'success1.mp3', 'success2.wav', 'success3.wav'],
    failed: ['failed0.wav', 'failed1.wav', 'failed2.wav']
  }

  constructor() {
  }

  static play(id, callback?) {
    let snd;
    if (typeof AudioLoaderService.audioSources[id] !== 'string') {
      const r = CommonService.getRandomNumber(0, AudioLoaderService.audioSources[id].length);
      snd = AudioLoaderService.audioSources[id][r];
    } else {
      snd = AudioLoaderService.audioSources[id];
    }

    const sound = new Howl({
      src: [AudioLoaderService.AudioBasePath + snd],
      html5 : true
    });

    sound.on('end', () => {
      if (callback) {
        callback();
      }
    });

    sound.play();
  }
}
