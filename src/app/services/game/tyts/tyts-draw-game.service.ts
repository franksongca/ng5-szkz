import { Injectable, Inject, Optional, EventEmitter } from '@angular/core';
import { TytsDrawingService } from './../../drawing/games/tyts-drawing.service';
import { AudioLoaderService } from './../../audio.manager.service';

@Injectable()
export class TytsDrawGameService {
  static LINES_SCALE = 1.338;
  static IMAGE_PATH = './assets/images/games/';
  fillInAreaShapes = [];
  fillInLinesImg;
  container;
  correctFilled = 0;
  wrongFilled = 0;
  splashingAni;
  splashingAniContainer;

  onGameOver: EventEmitter<number> = new EventEmitter();

  // constructor(@Inject('stage') @Optional() public stage?: any, @Inject('config') @Optional() public config?: any, @Inject('scale') @Optional() public scale?: Number) {

  constructor(@Inject('options') @Optional() public options: any) {
    TytsDrawingService.GAME_OVER = 0;
  }

  clear() {
    this.fillInAreaShapes.forEach((piece) => {
      piece.hanZi = null;
      piece.status = 0;
      TytsDrawingService.createLines(this.getLines(piece.index), {thickness: 1, stroke: 'white'}, piece.index, piece.name, piece.shape);
    });
  }

  bindHanziToFillInGraphics(characters) {
    let cIndex = 0;
    this.fillInAreaShapes.forEach((piece) => {
      piece.hanzi = characters[cIndex];
      cIndex++;
      if (cIndex > characters.length - 1) {
        cIndex = 0;
      }
    });
  }

  getFillInAreaNum() {
    return this.fillInAreaShapes.length;
  }

  getLines(index) {
    return this.options.imageInfo.pieces[index].lines;
  }

  drawImages() {
    const self = this;
    this.container = TytsDrawingService.createContainer();

    this.options.imageInfo.pieces.forEach((piece, index) => {
      const imgShape = TytsDrawingService.createLines(piece.lines, {thickness: 1, stroke: 'white'}, index, piece.name);

      imgShape.shape.x = this.options.pos.x + piece.pos.x * this.options.scale;
      imgShape.shape.y = this.options.pos.y + piece.pos.y * this.options.scale;
      imgShape.shape.scaleX = imgShape.shape.scaleY = this.options.scale * TytsDrawGameService.LINES_SCALE;

      imgShape.shape.mouseEnabled = true;
      imgShape.shape.cursor = 'pointer';
      imgShape.shape.addEventListener('mousedown', function(event) {
        if (TytsDrawingService.GAME_OVER) {
          return;
        }
        if (self.fillInAreaShapes[imgShape.index].status === 0) {
          if (TytsDrawingService.PenObject.color) {
            if (self.fillInAreaShapes[imgShape.index].hanzi.equalsInSpelling(TytsDrawingService.PenObject.hanZi)) {
              AudioLoaderService.play('correct', () => {
                AudioLoaderService.play('claping', () => {
                  self.correctFilled ++;
                  if (self.correctFilled === self.fillInAreaShapes.length) {
                    AudioLoaderService.play('success');

                    TytsDrawingService.GAME_OVER = 1;
                    self.onGameOver.emit(TytsDrawingService.GAME_OVER);
                    /// TODO: game done popup ?
                  }
                });
              });
              self.fillInAreaShapes[imgShape.index].status = 1;
              TytsDrawingService.movePenTo(event['rawX'], event['rawY'], () => {
                const color = TytsDrawingService.PenObject.color;
                TytsDrawingService.emptyInk(() => {
                  TytsDrawingService.createLines(piece.lines, {
                    thickness: 1,
                    stroke: color
                  }, imgShape.index, imgShape.name, imgShape.shape);

                  TytsDrawingService.movePenHome(null);
                });
              });
            } else {
              AudioLoaderService.play('splash', () => {
                self.wrongFilled ++;

                if (self.wrongFilled > self.fillInAreaShapes.length * 0.4) {
                  TytsDrawingService.emptyInk();
                  TytsDrawingService.movePenHome(null);

                  AudioLoaderService.play('failed');
                  TytsDrawingService.GAME_OVER = -1;
                  self.onGameOver.emit(TytsDrawingService.GAME_OVER);

                  /// TODO: game done popup ?                }
                }
              });

              self.playSplashingAni({pos: {x: event['rawX'], y: event['rawY']}});
              TytsDrawingService.movePenHome(null);
              TytsDrawingService.emptyInk();
            }
          } else {
            self.fillInAreaShapes[imgShape.index].hanzi.read();
          }
        }
      });

      this.container.addChild(imgShape.shape);
      // this.options.stage.addChild(imgShape.shape);

      this.fillInAreaShapes.push({index: index, name: piece.name, shape: imgShape.shape, status: 0});
    });

    // draw outline image
    const path = TytsDrawGameService.IMAGE_PATH + this.options.type + '/' + this.options.code + '/lines' + '.png';
    const img = TytsDrawingService.createBitmap({data: path, scale: this.options.scale, cursor: 'pointer'});

    img.x = this.options.pos.x + this.options.imageInfo.pos.x * this.options.scale;
    img.y = this.options.pos.y + this.options.imageInfo.pos.y * this.options.scale;
    img.cursor = 'default';

    this.container.addChild(img);
    this.options.stage.addChild(this.container);

    // this.options.stage.addChild(img);
    this.fillInLinesImg = img;


    this.splashingAniContainer = TytsDrawingService.createSplashingAnimation({data: this.options.splashData});
    this.splashingAni = this.splashingAniContainer.getChildByName('ani');

    this.splashingAni.alpha = 0;

    this.splashingAni.on('animationend', () => {
      this.splashingAni.alpha = 0;
    });

    this.options.stage.addChild(this.splashingAniContainer);
  }

  playSplashingAni(options) {
    this.splashingAni.x = options.pos.x;
    this.splashingAni.y = options.pos.y;
    this.splashingAni.alpha = 1;
    this.splashingAni.gotoAndPlay(0);
  }

}
