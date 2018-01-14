import { Component, HostListener, ViewChild, ElementRef, AfterContentInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './../../services/sz/article.service';
import { CanvasService } from './../../services/canvas.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements AfterContentInit, OnDestroy {
  @ViewChild('funcEle') el: ElementRef;

  _win;
  fullScreen = false;
  featureName;
  urlPath;

  @HostListener('window:resize') onResize($event) {
    CanvasService.TriggerResizeEvent({w: window.innerWidth, h: window.innerHeight});
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private articleService: ArticleService,
    private canvasService: CanvasService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._win = window;
  }

  toggleHeader(e) {
    e.preventDefault();
    this.fullScreen = !this.fullScreen;
  }

  ngAfterContentInit() {
    if (!this.articleService.isLoaded()) {
      this.router.navigate(['/']);
    } else {
      this.urlPath = this.route.url['value'][0].path;
      this.route.params.subscribe( params => {
        this.featureName = params.featureName;
      });
    }

    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {

  }
}
