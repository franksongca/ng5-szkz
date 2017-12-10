'use strict';

angular.module('szkzApp.services').factory('ArticleFactory', ['$rootScope', '$http', '$timeout', '_',
    'ArticleListFactory', 'UIService',
    function($rootScope, $http, $timeout, _, ArticleListFactory, UIService)
{
    var currentArticle,
        articleType,
        articleCode,
        totalPage,
        inLoading = true,
        player = document.getElementById('audio-player'),
        sourceMP3 = document.getElementById('audio-src-mp3'),
        audioURL = 'http://sz-abc.com/ng/audio/';

    return {
        loadArticle: function(code){
            var group = ArticleListFactory.getArticleGroupIndex(code),
                article = code.split('-'),
                url,// = "data\\WenZhang\\" + article[0] + "\\" + (group == undefined ? "" : "g" + group + "\\") + article[1] + "\\text.xml",
                blankCharacter = {hanZi: '', pinYin: '', shengDiao: '', 'ori_id': '', mistake: 0, index: 0, characterIndex: ''};

            if (articleType + '-' + articleCode === code) {
                return;
            }

            inLoading = true;

            articleType = article[0];
            articleCode = article[1];

            UIService.showSpinner(true);

            url = 'data\\WenZhang\\' + articleType + '\\' + (group === undefined ? '' : 'g' + group + '\\') + articleCode + '\\text.xml';

            $http.get(url).then(function (response) {
                //console.log(response.data);
                var oParser = new DOMParser(),
                    oDOM = oParser.parseFromString(response.data, 'text/xml'),
                    pagesAttributes = oDOM.firstChild.attributes,
                    attributes,
                    ziObj,
                    pageObj,
                    cuePointsText,
                    charCount,
                    characterIndex,
                    appendChars,
                    i,
                    cuePoint,
                    attrLineSpacing = 'line_spacing',
                    attrRowsPerPage = 'rows_per_page',
                    attrCharactersPerRow = 'characters_per_row',
                    attrPositionX = 'position_x',
                    attrPositionY = 'position_y',
                    attrHanZi = 'han_zi',
                    attrShengDiao = 'sheng_diao',
                    attrPinYin = 'pin_yin',
                    attrOriginalId = 'ori_id',
                    attrXuHao = 'xu_hao',
                    tempChar;

                currentArticle = {};
                currentArticle.pageAttributes = {};

                currentArticle.pageAttributes.scale = pagesAttributes.scale.value;
                currentArticle.pageAttributes.valign = pagesAttributes.valign.value;
                currentArticle.pageAttributes.halign = pagesAttributes.halign.value;
                currentArticle.pageAttributes.lineSpacing = pagesAttributes[attrLineSpacing].value;
                currentArticle.pageAttributes.charactersPerRow = pagesAttributes[attrCharactersPerRow].value;
                currentArticle.pageAttributes.rowsPerPage = pagesAttributes[attrRowsPerPage].value;
                currentArticle.pageAttributes.positionX = pagesAttributes[attrPositionX].value;
                currentArticle.pageAttributes.positionY = pagesAttributes[attrPositionY].value;
                currentArticle.pageAttributes.style = pagesAttributes.style.value;

                currentArticle.pages = [];
                _.each(oDOM.firstChild.children, function(page){
                    pageObj = {};

                    pageObj.pageAttributes = {};
                    pageObj.pageAttributes.align = page.attributes.align.value;
                    pageObj.pageAttributes.lineSpacing = page.attributes[attrLineSpacing].value;
                    pageObj.pageAttributes.scale = page.attributes.scale.value;
                    pageObj.pageAttributes.positionX = page.attributes[attrPositionX].value;
                    pageObj.pageAttributes.positionY = page.attributes[attrPositionY].value;
                    pageObj.pageAttributes.charactersPerRow = page.attributes[attrCharactersPerRow].value;
                    pageObj.pageAttributes.rowsPerPage = page.attributes[attrRowsPerPage].value;
                    pageObj.pageAttributes.halign = page.attributes.halign.value;
                    pageObj.pageAttributes.valign = page.attributes.valign.value;

                    cuePointsText = page.getElementsByTagName('cue_points')[0].firstChild.nodeValue.replace('\n','');

                    pageObj.cuePoints = cuePointsText.split(',');

                    pageObj.characters = [];
                    charCount = 0;
                    characterIndex = 0;

                    _.each(page.getElementsByTagName('paragraph'), function (p) {
                        _.each(p.getElementsByTagName('zi'), function (zi) {
                            attributes = zi.attributes;
                            ziObj = {};

                            if(attributes[attrHanZi].value === ''){
                                if(charCount % currentArticle.pageAttributes.charactersPerRow > 0){
                                    appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
                                    for (i=0; i< appendChars; i++) {
                                        tempChar = angular.copy(blankCharacter);
                                        tempChar.index = charCount;
                                        pageObj.characters.push(tempChar);

                                        charCount++;
                                    }
                                }
                            } else {
                                ziObj.hanZi = attributes[attrHanZi].value;
                                if(ziObj.hanZi === ''){
                                    //var p = ziObj.hanZi;
                                    //ziObj.hanZi = "&nbsp;";
                                }

                                ziObj.shengDiao = attributes[attrShengDiao].value;
                                ziObj.pinYin = attributes[attrPinYin].value;
                                if(ziObj.pinYin === ''){
                                    ziObj.characterIndex = '';
                                } else {
                                    cuePoint = pageObj.cuePoints[characterIndex];
                                    pageObj.cuePoints[characterIndex] = {cuePoint: +cuePoint, realIndex: +attributes[attrXuHao].value, pinyin: ziObj.pinYin + '_' + ziObj.shengDiao };

                                    ziObj.characterIndex = 'character-' + (++characterIndex);
                                }

                                if (attributes.id) {
                                    ziObj[attrOriginalId] = attributes.id.value;
                                } else {
                                    ziObj[attrOriginalId] = '';
                                }

                                ziObj.mistakes = attributes.mistakes.value;
                                ziObj.times = attributes.times.value;
                                ziObj.index = attributes[attrXuHao].value;
                                pageObj.characters.push(ziObj);

                                //console.log("ziObj.index=" + ziObj.index + ":" + charCount);
                                charCount++;
                            }
                        });

                        if(charCount % currentArticle.pageAttributes.charactersPerRow > 0){
                            appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
                            for (i = 0; i < appendChars; i++) {
                                tempChar = angular.copy(blankCharacter);
                                tempChar.index = charCount;
                                pageObj.characters.push(tempChar);
                                charCount++;
                            }
                        }
                    });

                    currentArticle.pages.push(pageObj);
                });

                totalPage = currentArticle.pages.length;
                inLoading = false;

                $timeout(function () {
                    UIService.hideSpinner();
                }, 1000);
            });
        },

        getTotalPages: function () {
            return totalPage;
        },

        getArticleInfo: function () {
            return ArticleListFactory.getArticleInfo({type: articleType, code: articleCode});
        },

        getArticleType: function () {
            return articleType;
        },

        getArticleCode: function () {
            return articleCode;
        },

        getArticle: function () {
            return currentArticle;
        },

        getLoadingStatus: function () {
            return inLoading;
        },

        getPageCharacters: function (index) {
            return currentArticle.pages[index].characters;
        },

        getCharactersPerLine: function () {
            return parseInt(currentArticle.pageAttributes.charactersPerRow);
        },

        getPageTotalLines: function (index) {
            return currentArticle.pages[index].characters.length / this.getCharactersPerLine();
        },

        getPageLines: function (index) {
            var lines = [],
                counter = 0,
                lineCount = 0,
                characters = currentArticle.pages[index].characters;

            lines[0] = [];
            for (var i = 0; i < characters.length; i++) {
                counter++;
                if (counter > this.getCharactersPerLine(index)) {
                    lineCount++;
                    counter = 0;
                    lines[lineCount] = [];
                }
                lines[lineCount].push(characters[i]);
            }

            return lines;
        },

        getCuePoints: function (index) {
            return currentArticle.pages[index].cuePoints;
        },

        getAudioBaseURL: function () {
            return audioURL;
        },

        getAudioURL: function(audioFormat){
            var code = this.getArticleType() + '-' + this.getArticleCode(),
                group = ArticleListFactory.getArticleGroupIndex(code),
                article = code.split('-');

            audioFormat = audioFormat || 'mp3';

            return this.getAudioBaseURL() +  'WenZhang/' +article[0] + '/' +
                (group === undefined ? '' : 'g'+group + '/') +
                article[1] + '/' + (audioFormat === undefined ? '' : (audioFormat + '/'));
        }
    };
}]);
