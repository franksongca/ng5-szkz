import { Component } from '@angular/core';
import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { DeviceTimerService } from './services/device-timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  testing = true;

  constructor(private articleListService: ArticleListService, private articleService: ArticleService) {
    DeviceTimerService.init();

    ArticleListService.loadArticleList().subscribe((response) => {
      // test article-list.service
      if (this.testing) {
        // alert(ArticleListService.getAppName());

        this.articleService.loadArticle('kj-SZJ');
      }
    });
  }

  // loadArticle() {
  //   this.articleService.loadArticle('kj-SZJ');
  // }


}
