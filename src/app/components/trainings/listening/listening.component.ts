import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CanvasService } from '../../../services/canvas.service';
import { ArticleService } from '../../../services/sz/article.service';
import { HanziSelectionService } from '../../../services/sz/hanzi-selection.service';
import { ListeningDrawingService } from '../../../services/drawing/trainings/listening/listening-drawing.service';
@Component({
  selector: 'app-training-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {
  pageIndex;
  hanZiSelection;

  subscription: ISubscription;

  constructor(
    private canvasService: CanvasService,
    private articleService: ArticleService,
    private listeningDrawingService: ListeningDrawingService
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.listeningDrawingService.destroy();
  }

  getHanziSelection() {
    const hanziSelectionService: HanziSelectionService = new HanziSelectionService(this.articleService.getPage(this.pageIndex - 1));

    this.hanZiSelection = hanziSelectionService.ZiArray; // .getSelectionUniquePronunciation(true);

    this.listeningDrawingService.drawHanzi(this.hanZiSelection);
  }

  canvasSizeChanged() {

  }

}
