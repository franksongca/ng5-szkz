import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageDataService } from '../../../services/game/image-data.service';
import { ArticleService } from '../../../services/sz/article.service';
import { HanziSelectionService } from '../../../services/sz/hanzi-selection.service';

@Component({
  selector: 'app-fill-in-the-color-menu',
  templateUrl: './tyts-menu.component.html',
  styleUrls: ['./tyts-menu.component.css']
})
export class TytsMenuComponent implements OnInit, OnChanges {
  static GameType = 'tyts';
  gameCode = 'Pic_2';

  gameSharedData;

  constructor(private imageDataService: ImageDataService, private articleService: ArticleService) {}

  ngOnInit() {
    this.imageDataService.loadGameSharedData(TytsMenuComponent.GameType).subscribe(
      (response) => {
        this.gameSharedData = response;
      },
      () => console.log('error occurs when loading images of [' + TytsMenuComponent.GameType + '][' + this.gameCode + ']')
    );
  }

  ngOnChanges(changes) {
  }

}
