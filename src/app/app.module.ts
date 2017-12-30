import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AudioLoaderService } from './services/audio.manager.service';
import { CommonService } from './services/common.service';
import { DeviceTimerService } from './services/device-timer.service';
import { DrawingService } from './services/drawing/drawing.service';
import { ZiDrawingService } from './services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './services/drawing/pinyin.drawing.service';
import { HanziDrawingService } from './services/drawing/hanzi.drawing.service';
import { TytsDrawingService } from './services/drawing/games/tyts-drawing.service';

import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { PinyinService } from './services/sz/pinyin.service';
import { HanziSelectionService } from './services/sz/hanzi-selection.service';
import { ZiService } from './services/sz/zi.service';

import { ImageDataService } from './services/game/image-data.service';

import { TytsDrawGameService } from './services/game/tyts/tyts-draw-game.service';

import { AppComponent } from './app.component';

import { FillInTheColorComponent } from './games/fill-in-the-color/template/fill-in-the-color.component';
import { PageSelectorComponent } from './components/page-selector.component';
import { CanvasTemplateComponent } from './components/canvas-template/canvas-template.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    FillInTheColorComponent,
    AppComponent,
    PageSelectorComponent,
    CanvasTemplateComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
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
    TytsDrawingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
