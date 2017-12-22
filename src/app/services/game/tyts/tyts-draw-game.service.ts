import { Injectable, Inject, Optional } from '@angular/core';
import { TytsDrawingService } from './../../drawing/games/tyts-drawing.service';

@Injectable()
export class TytsDrawGameService {
  static LINES_SCALE = 1.338;
  static IMAGE_PATH = './assets/images/games/';
  fillInAreaShapes = [];
  fillInLinesImg;
  container;

  colorPlateObject;

  // constructor(@Inject('stage') @Optional() public stage?: any, @Inject('config') @Optional() public config?: any, @Inject('scale') @Optional() public scale?: Number) {

  constructor(@Inject('options') @Optional() public options: any) {
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
        if (self.fillInAreaShapes[imgShape.index].status === 0 && TytsDrawingService.PenObject.color) {
          self.fillInAreaShapes[imgShape.index].status = 1;
          TytsDrawingService.movePenTo(event['rawX'], event['rawY'], () => {
            const color = TytsDrawingService.PenObject.color;
            TytsDrawingService.emptyInk(() => {
              TytsDrawingService.createLines(piece.lines, {thickness: 1, stroke: color}, imgShape.index, imgShape.name, imgShape.shape);

              TytsDrawingService.movePenHome(null);
            });
          });
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
  }

}
