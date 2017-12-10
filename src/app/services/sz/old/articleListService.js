'use strict';

angular.module('szkzApp.services').factory('ArticleListFactory', ['$rootScope', '$http', '_', function($rootScope, $http, _){
    var articleList;
    
    function loadArticleList () {
        return $http.get('data/content-list.json')
            .then(function (response) {
                if(angular.isObject(response.data)){
                    articleList = response.data;
                    return true;
                } else {
                    return false;
                }
            }, function () {
                return false;
            });
    }

    function convertArticleCode (option) {  // option could be kj-SZJ or {type: 'kj', code: 'SZJ'}
        var temp = option;

        if (typeof option === 'string') {
            temp = option.split('-');
            option = {};
            option.code = temp[1];
            option.type = temp[0];
        }

        return option;
    }
    
    return {
        init: function () {
            return loadArticleList();
        },
        
        getArticles: function () {
            return articleList.articles;
        },
        
        getAppName: function () {
            return articleList.appName;
        },
        
        getArticleCount: function () {
            return articleList.articles.length;
        },
        
        getArticleInfo: function (option) {
            var articleGroup, article;

            option = convertArticleCode(option);

            articleGroup = this.getArticleGroup(option);

            article = _.find(articleGroup.articles, function (article) {
                return article.code === (option.type + '-' + option.code.toUpperCase());
            });
            
            return article;
        },
        
        getArticleTypeLabel: function (type) {
            var articleGroup = _.find(articleList.articles, function (articleGroup) {
                    return articleGroup.type === type;
                }); 
            
            return articleGroup.label;
        },
        
        getArticleGroup: function (option) {
            var articleGroup;

            option = convertArticleCode(option);

            articleGroup = _.find(articleList.articles, function (articleGroup) {
                return articleGroup.type === option.type;
            });

            return articleGroup;
        },

        getArticleGroupIndex: function (option) {
            return this.getArticleInfo(option).group;
        },

        isContentLoaded: function () {
            return angular.isDefined(articleList);
        }
    };
}]);
