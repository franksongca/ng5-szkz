import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ImageDataService {

  constructor(private http: HttpClient) { }

  load(url) {
    return this.http.get(url);
  }

  loadTytsGameData(gameType, gameCode) {
    const url = 'assets\\imgs\\games\\' + gameType + '\\' + gameCode + '\\imgs.json' ;
    return this.load(url);
  }

  loadGameSharedData(gameType) {
    const url = 'assets\\imgs\\games\\' + gameType + '\\imgs.json' ;
    return this.load(url);
  }

}
