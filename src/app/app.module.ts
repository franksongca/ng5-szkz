import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CommonService } from './services/common.service';
import { DeviceTimerService } from './services/device-timer.service';
import { DrawingService } from './services/drawing/drawing.service';
import { ZiDrawingService } from './services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './services/drawing/pinyin.drawing.service';
import { HanziDrawingService } from './services/drawing/hanzi.drawing.service';

import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { PinyinService } from './services/sz/pinyin.service';

import { ImageDataService } from './services/game/image-data.service';

import { TytsDrawGameService } from './services/game/tyts/tyts-draw-game.service';

import { AppComponent } from './app.component';

import { FillInTheColorComponent } from './games/fill-in-the-color/template/fill-in-the-color.component';
import { TytsMenuComponent } from './games/fill-in-the-color/games-menu/tyts-menu.component';
import { PageSelectorComponent } from './components/page-selector.component';

@NgModule({
  declarations: [
    FillInTheColorComponent,
    TytsMenuComponent,
    AppComponent,
    PageSelectorComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule
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
    ImageDataService,
    TytsDrawGameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
