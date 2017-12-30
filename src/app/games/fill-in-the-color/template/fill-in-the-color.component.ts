/// <reference path="../../../../../node_modules/createjs-module/createjs.d.ts" />
import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ImageDataService } from '../../../services/game/image-data.service';
import { TytsDrawingService } from '../../../services/drawing/games/tyts-drawing.service';
import { CommonService } from './../../../services/common.service';
import { CanvasService } from './../../../services/canvas.service';
import { ArticleService } from '../../../services/sz/article.service';
import { HanziSelectionService } from '../../../services/sz/hanzi-selection.service';

import { TytsDrawGameService } from '../../../services/game/tyts/tyts-draw-game.service';

// import { ZiDrawingService } from '../../services/drawing/zi.drawing.service';
// import { PinyinDrawingService } from './../../services/drawing/pinyin.drawing.service';
// import { PinyinService } from './../../services/sz/pinyin.service';
import { HanziDrawingService } from '../../../services/drawing/hanzi.drawing.service';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-fill-in-the-color',
  templateUrl: './fill-in-the-color.component.html',
  styleUrls: ['./fill-in-the-color.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FillInTheColorComponent implements OnInit, OnChanges, AfterViewInit {
  static GameType = 'tyts';

  gameSharedData;

  gameCode = 'Pic_2';

  marginHeight = 0;
  canvasSize = {};

  gameStatus = {
    stageReady: false,
    selectionReady: false
  };

  gameImagesInfo;
  pageIndex;
  hanZiSelection;

  constructor(
    private commonService: CommonService,
    private canvasService: CanvasService,
    private imageDataService: ImageDataService,
    private tytsDrawGameService: TytsDrawGameService,
    private articleService: ArticleService,
    private tytsDrawingService: TytsDrawingService
  ) {

    this.articleService.onPageChanged.subscribe((n) => {
      TytsDrawingService.GAME_OVER = 0;
      this.pageIndex = n;
      this.getHanziSelection();
    });

    // this is one time thing
    this.imageDataService.loadGameSharedData(FillInTheColorComponent.GameType).subscribe(
      (response) => {
        this.gameSharedData = response;

        this.drawGameStage();
      },
      () => console.log('error occurs when loading images of [' + FillInTheColorComponent.GameType + ']')
    );


    this.loadGameData();
  }

  getHanziSelection() {
    const hanziSelectionService: HanziSelectionService = new HanziSelectionService(this.articleService.getPage(this.pageIndex - 1));

    this.hanZiSelection = hanziSelectionService.getSelectionUniquePronunciation(true);

    this.gameStatus.selectionReady = true;
    this.prepareGame();
  }




  ngOnInit() {
  }

  ngAfterViewInit() {

    // this.stage.addChild(DrawingService.createRect({thickness: 1,
    //   stroke: 'black',
    //   fill: 'white'}, {pos: {x: 0, y: 0}, size: {w: 800, h: 600}}));


    // const hz = {'hanZi': '人', 'shengDiao': '2', 'pinYin': 'ren', 'characterIndex': 'character-1', 'ori_id': '649', 'mistakes': '0', 'times': '0', 'index': '0',
    //   'pinyinObj': [{'letter': 'r', 'color': 'blue', 'type': 's', 'originalLetter': 'r', 'read': 'r'},
    //     {'letter': 'é', 'color': '#990000', 'type': 'yt', 'originalLetter': 'e', 'read': 'en'},
    //     {'letter': 'n', 'color': '#990000', 'type': 'y', 'originalLetter': 'n', 'read': 'en'}]};
    // const hzDrawing = new HanziDrawingService();
    //
    // hzDrawing.createHanzi(hz, this.stylesSettings);
    // this.stage.addChild(hzDrawing);



    // const img = DrawingService.createBitmap({data: './assets/config/loading.gif', scale: 1, cursor: 'pointer'});
    // this.stage.addChild(img);
    //

    // the stage.update makes drawing bitmap works!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // hzDrawing.ziColorFlicking(this.stage, ['purple', 'white', 'darkred'], 20, 20);

  }

  // invoked after game code changed
  loadGameData() {
    this.imageDataService.loadTytsGameData(FillInTheColorComponent.GameType, this.gameCode).subscribe(
      (response) => {
        this.gameImagesInfo = response;

        this.drawGameStage();
      },
      () => console.log('error occurs when loading images of [' + FillInTheColorComponent.GameType + '][' + this.gameCode + ']')
    );
  }




  ngOnChanges(changes) {
    // if (changes.gameCode && changes.gameCode.previousValue !== changes.gameCode.currentValue) {
    //   this.imageDataService.loadTytsGameData(FillInTheColorComponent.GameType, this.gameCode).subscribe(
    //     (response) => {
    //       this.gameImagesInfo = response;
    //
    //       this.drawGameStage();
    //     },
    //     () => console.log('error occurs when loading images of [' + FillInTheColorComponent.GameType + '][' + this.gameCode + ']')
    //   );
    // }

    // if (changes.gameSharedData && changes.gameSharedData.previousValue !== changes.gameSharedData.currentValue) {

    //   this.drawGameStage();
    // }
  }

  drawGameStage() {
    if (this.gameImagesInfo && this.gameSharedData) {
      this.tytsDrawGameService = new TytsDrawGameService({
        imageInfo: this.gameImagesInfo,
        scale: 1.1,
        type: FillInTheColorComponent.GameType,
        splashData: this.gameSharedData.splashing,
        code: this.gameCode,
        pos: {x: 50, y: 10}
      });
      this.tytsDrawGameService.drawImages();

      const cp = TytsDrawingService.createColorPlate({
        fillInAreaNum: this.gameImagesInfo.pieces.length,
        colorNum: this.gameSharedData.colorNum,
        plateColors: this.gameSharedData.plateColors,
        colorPlateIconData: this.gameSharedData.plate,
        fontFamily: this.gameSharedData.stylesSettings.zi.fontFamily,
        scale: CanvasService.Scale
      });
      CanvasService.Stage.addChild(cp);

      const c = TytsDrawingService.createPenBrash({fill: 'green', stroke: 'green', penData: this.gameSharedData.pen});
      CanvasService.Stage.addChild(c);

      TytsDrawingService.movePenHome();

      this.gameStatus.stageReady = true;
      this.prepareGame();
    }
  }

  prepareGame() {
    if (this.gameStatus.selectionReady && this.gameStatus.stageReady) {
      this.tytsDrawGameService.clear();
      this.tytsDrawGameService.bindHanziToFillInGraphics(this.hanZiSelection);
      TytsDrawingService.bindHanziToPlate(this.hanZiSelection);

      // alert('prepareGame()');
      this.canvasSizeChanged();
    }
  }

  canvasSizeChanged() {
    if (this.gameStatus.stageReady) {
      TytsDrawingService.repositionColorPlate();
    }
  }
}
