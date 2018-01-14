import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CanvasService } from '../../services/canvas.service';
import { ArticleService } from '../../services/sz/article.service';
import { HanziSelectionService } from '../../services/sz/hanzi-selection.service';
import { TrainingDrawingService } from '../../services/drawing/trainings/training-drawing.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  static FEATURES = {
    listening: 'listening',
    listeningOneByOne: 'listeningOneByOne',
    listeningOneByOneRandomOrder: 'listeningOneByOneRandomOrder',
    clickAndRead: 'clickAndRead',
    clickAndReadRandomOrder: 'clickAndReadRandomOrder'
  };

@Input() feature;
  pageIndex;
  hanZiSelection;

  subscription: ISubscription;

  constructor(
    private canvasService: CanvasService,
    private articleService: ArticleService,
    private listeningDrawingService: TrainingDrawingService
  ) {
    // must be triggered by page selector
    this.subscription = this.articleService.onPageChanged.subscribe((n) => {
      if (this.articleService) {
        this.pageIndex = this.articleService.getCurrentPage();
        this.getHanziSelection();
      }
    });

  }

  ngOnInit() {
    alert(this.feature);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.listeningDrawingService.destroy();
  }

  getHanziSelection() {
    const hanziSelectionService: HanziSelectionService = new HanziSelectionService(this.articleService.getPage(this.pageIndex - 1));

    switch (this.feature) {
      case TrainingComponent.FEATURES.listening:
      case TrainingComponent.FEATURES.listeningOneByOne:
      case TrainingComponent.FEATURES.clickAndRead:
        this.hanZiSelection = hanziSelectionService.ZiArray; // .getSelectionUniquePronunciation(true);
        this.listeningDrawingService.drawHanzi(this.hanZiSelection);
        break;
    }
  }

  canvasSizeChanged() {

  }

}
