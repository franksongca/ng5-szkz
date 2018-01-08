import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../../../services/canvas.service';
import { ArticleService } from '../../../services/sz/article.service';
import { HanziSelectionService } from '../../../services/sz/hanzi-selection.service';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss']
})
export class ListeningComponent implements OnInit {
  pageIndex;
  hanZiSelection;

  constructor(
    private canvasService: CanvasService,
    private articleService: ArticleService,
  ) {
    // must be triggered by page selector
    this.articleService.onPageChanged.subscribe((n) => {
      if (this.articleService) {
        this.pageIndex = this.articleService.getCurrentPage();
        this.getHanziSelection();
      }
    });

  }

  ngOnInit() {
  }

  getHanziSelection() {
    const hanziSelectionService: HanziSelectionService = new HanziSelectionService(this.articleService.getPage(this.pageIndex - 1));

    this.hanZiSelection = hanziSelectionService.getSelectionUniquePronunciation(true);
  }

}
