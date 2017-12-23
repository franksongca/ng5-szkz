import { Injectable, Inject, Optional } from '@angular/core';
import { Howl } from 'howler';

@Injectable()
export class ZiService {
  static AudioBasePath = './assets/media/Zi/';

  allSpellings;

  index: number;
  word: string;
  spelling: string;
  tone: number;
  id: number;
  qingSheng: number;
  updated: boolean;

  numMistake: number;
  numTaken: number;

  constructor(@Inject('options') @Optional() private ziObj: any) {
    this.allSpellings = [];

    this.numMistake = ziObj.mistakes === undefined ? 0 : ziObj.mistakes;
    this.numTaken = ziObj.times === undefined ? 0 : ziObj.times;
    this.index = ziObj.index;
    this.word = ziObj.hanZi;
    this.spelling = ziObj.pinYin;
    this.tone = ziObj.shengDiao;
    this.id = ziObj.ori_id;
    this.qingSheng = ziObj.qs;
    this.updated = false;

    if (this.ziObj.pinYin) {
      this.allSpellings.push(this.ziObj.pinYin + '_' + this.ziObj.shengDiao);
    }
  }

  read() {
    const sound = new Howl({
      src: [ZiService.AudioBasePath + this.spelling + '_' + this.tone + '.mp3'],
      html5 : true
    });

    sound.play();

    // trace("ZI :: read: "+((Configuration.MAIN == null ? Configuration.RELATIVE_PATH : "") + KOUJUE_AUDIO_PATH + _spelling + "_" + _tone + ".mp3"));
    //
    // try{
    //   var soundRequest:URLRequest = new URLRequest((Configuration.MAIN == null ? Configuration.RELATIVE_PATH : "") + KOUJUE_AUDIO_PATH + _spelling + "_" + _tone + ".mp3");
    //   var audioSound:Sound = new Sound(soundRequest);
    //   audioSound.addEventListener(IOErrorEvent.IO_ERROR, handlerAudioError);
    //   audioSound.play();
    // } catch(e:IOErrorEvent) {
    //   trace("ZI :: Cannot find audio file.");
    // }
  }

  equals(zi): boolean {
    return(this.Key === zi.Key);
  }

  equalsFully(zi): boolean {
    let equal = true;
    if (this.equals(zi) && this.TotalSpellings === zi.TotalSpellings) {
      for (let i = 0; i < this.allSpellings.length; i++) {
        if (!zi.isSpellingExisting(this.allSpellings[i])) {
          equal = false;
          break;
        }
      }
    } else {
      equal = false;
    }
    return(equal);
  }

  equalsInSpelling(zi: ZiService): boolean {
    return(this.spelling === zi.Spelling && this.tone === zi.Tone);
  }


  get Key(): string {
    return(this.word + '-' + this.spelling + '-' +  this.tone);
  }

  set Zi(zi) {
    this.ziObj.hanZi = zi.ziObj.hanZi;
    this.ziObj.pinYin = zi.ziObj.pinYin;
    this.ziObj.shengDiao = zi.ziObj.shengDiao;

    this.ziObj.qs = zi.ziObj.qs;
  }

  addSpellings(spellings): void {
    for (let i = 0; i < spellings.length; i++) {
      if (spellings[i] !== this.spelling + '_' + this.tone) {
        this.allSpellings.push(spellings[i]);
      }
    }
  }

  isSpellingExisting(spelling: string): boolean {
    let exists = false;
    for (let s = 0; s < this.allSpellings.length; s++) {
      if (spelling === this.allSpellings[s]) {
        exists = true;
        break;
      }
    }
    return(exists);
  }

  isCurrentSpelling(spelling: string): boolean {
    return (this.spelling + '_' + this.tone) === spelling;
  }

  replaceSpelling(newSpelling: string, oldSpelling: string): void {
    for (let s = 0; s < this.allSpellings.length; s++) {
      if (oldSpelling === this.allSpellings[s]) {
        this.allSpellings[s] = newSpelling;
        break;
      }
    }
  }

  addSpelling(spelling: string): boolean {
    // if not existing then add and return true
    const successful: boolean = !this.isSpellingExisting(spelling);
    if (successful) {
      this.allSpellings.push(spelling);
    }
    return(successful);
  }

  removeSpelling(item: string): void {
    const cp: number = this.SpellingIndex;

    let index = -1;
    for (let s = 0; s < this.allSpellings.length; s++) {
      if (this.allSpellings[s] === item) {
        index = s;
        break;
      }
    }

    if (index !== -1) {
      for (let s = index; s < this.allSpellings.length - 1; s++) {
        this.allSpellings[s] = this.allSpellings[s + 1];
      }

      this.allSpellings.pop();

      if (cp === index) {
        // the one deleted is the current, use the first to replace the current one
        const sp = this.allSpellings[0].split('_');

        this.spelling = sp[0];
        this.tone = sp[1];

        this.ziObj.pinYin = this.spelling;
        this.ziObj.shengDiao = this.tone;

        this.ziObj.qs = this.qingSheng;
      }
    }
  }

  decreaseMistakes(): void {
    this.numMistake --;
  }

  isBlank(): boolean {
    return this.word === '';
  }






  // current spelling's index in all spellings
  get SpellingIndex(): number {
    let index = 0;
    for (let s = 0; s < this.allSpellings.length; s++) {
      if (this.spelling + '_' + this.tone === this.allSpellings[s]) {
        index = s;
        break;
      }
    }
    return(index);
  }

  get Mistakes(): number {
    return this.numMistake;
  }

  set Mistakes(val: number) {
    this.numMistake = val;
  }

  set TimesTaken(val: number) {
    this.numTaken = val;
  }

  get TimesTaken(): number {
    return this.numTaken;
  }

  get ID(): number {
    return this.id;
  }
  set ID(id: number) {
    this.id = id;
  }

  get ZiObj() {
    return this.ziObj;
  }

  get ScoreUpdated(): boolean {
    return this.updated;
  }

  set ScoreUpdated(updated: boolean) {
    this.updated = updated;
  }

  get TotalSpellings(): number {
    return this.allSpellings.length;
  }

  get Spellings() {
    return this.allSpellings;
  }

  set Spellings(val) {
    this.allSpellings = val;
  }

  get Word(): string {
    return this.word;
  }
  set Word(word: string) {
    this.word = word;
  }

  get Spelling(): string {
    return this.spelling;
  }
  set Spelling(spelling: string) {
    this.spelling = spelling;
  }

  get QingSheng(): number {
    return this.qingSheng;
  }
  set QingSheng(qs: number) {
    this.qingSheng = qs;
  }

  get Tone(): number {
    return this.tone;
  }
  set Tone(tone: number) {
    this.tone = tone;
  }

  get Index(): number {
    return this.index;
  }
  set Index(val: number) {
    this.index = val;
  }


}
