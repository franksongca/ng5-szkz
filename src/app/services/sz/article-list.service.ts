import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';

@Injectable()
export class ArticleListService {
  static ModuleName = 'ArticleListService';
  static articleList;
  static http;

  constructor(private http: HttpClient) {
    ArticleListService.http = this.http;
  }

  static getArticles () {
    return ArticleListService.articleList.articles;
  }

  static loadArticleList(): Observable<any> {
    let observable;

    if (ArticleListService.isContentLoaded()) {
      observable = Observable.create(ArticleListService.articleList);
    } else {
      observable = ArticleListService.http.get('./assets/data/content-list.json');

      observable.subscribe((response) => {
          ArticleListService.articleList = response;
          console.log('load content-list.json and return the list.');
        },
        () => console.log('error occurs when loading content-list.json')
      );
    }

    return observable;
  }

  static convertArticleCode(option) {  // option could be kj-SZJ or {type: 'kj', code: 'SZJ'}
    let temp = option;

    if (typeof option === 'string') {
      temp = option.split('-');
      option = {};
      option.code = temp[1];
      option.type = temp[0];
    }

    return option;
  }

  static getAppName () {
    return ArticleListService.articleList.appName;
  }

  static getArticleCount() {
    return ArticleListService.articleList.articles.length;
  }

  static getArticleInfo(option) {
    let articleGroup, article;

    option = ArticleListService.convertArticleCode(option);

    articleGroup = ArticleListService.getArticleGroup(option);

    article = articleGroup.articles.find((a) => {
      return a.code === (option.type + '-' + option.code.toUpperCase());
    });

    return article;
  }

  static getArticleTypeLabel (type) {
    const articleGroup = ArticleListService.articleList.articles.find((ag) => {
      return ag.type === type;
    });

    return articleGroup.label;
  }

  static getArticleGroup(option) {
    let articleGroup;

    option = ArticleListService.convertArticleCode(option);

    articleGroup = ArticleListService.articleList.articles.find((ag) => {
      return ag.type === option.type;
    });

    return articleGroup;
  }

  static getArticleGroupIndex(option) {
    return ArticleListService.getArticleInfo(option).group;
  }

  static isContentLoaded () {
    return ArticleListService.articleList && (Object.keys(ArticleListService.articleList).length > 0);
  }
}
