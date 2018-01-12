import { BrowserModule,  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AudioLoaderService } from './services/audio.manager.service';
import { CommonService } from './services/common.service';
import { CanvasService } from './services/canvas.service';
import { DeviceTimerService } from './services/device-timer.service';
import { DrawingService } from './services/drawing/drawing.service';
import { ZiDrawingService } from './services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './services/drawing/pinyin.drawing.service';
import { HanziDrawingService } from './services/drawing/hanzi.drawing.service';
import { TytsDrawingService } from './services/drawing/games/tyts-drawing.service';
import { BaseTrainingsDrawingService } from './services/drawing/trainings/base.trainings.drawing.service';
import { ListeningDrawingService } from './services/drawing/trainings/listening/listening-drawing.service';

import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { PinyinService } from './services/sz/pinyin.service';
import { HanziSelectionService } from './services/sz/hanzi-selection.service';
import { ZiService } from './services/sz/zi.service';

import { ImageDataService } from './services/game/image-data.service';

import { TytsDrawGameService } from './services/game/tyts/tyts-draw-game.service';

import { AppComponent } from './app.component';

import { FillInTheColorComponent } from './components/games/fill-in-the-color/fill-in-the-color.component';
import { PageSelectorComponent } from './components/page-selector.component';
import { CanvasTemplateComponent } from './components/canvas-template/canvas-template.component';
import { HomeComponent } from './components/home/home/home.component';
import { FeaturesComponent } from './components/features-template/features.component';
import { ListeningComponent } from './components/trainings/listening/listening.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'training/:featureName',
    component: FeaturesComponent
    // children: [
    //   {
    //     path: 'fillcolor',
    //     component: FillInTheColorComponent
    //   }
    // ]
  },
  {
    path: 'gaming/:featureName',
    component: FeaturesComponent
  },
  {
    path: 'testing/:featureName',
    component: FeaturesComponent
  }
];

@NgModule({
  declarations: [
    FillInTheColorComponent,
    AppComponent,
    PageSelectorComponent,
    CanvasTemplateComponent,
    HomeComponent,
    FeaturesComponent,
    ListeningComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CommonService,
    CanvasService,
    DeviceTimerService,
    DrawingService,
    ZiDrawingService,
    PinyinDrawingService,
    HanziDrawingService,
    ArticleListService,
    ArticleService,
    PinyinService,
    HanziSelectionService,
    ZiService,
    AudioLoaderService,
    ImageDataService,
    TytsDrawGameService,
    TytsDrawingService,
    ListeningDrawingService,
    BaseTrainingsDrawingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export class ChildModule {}
