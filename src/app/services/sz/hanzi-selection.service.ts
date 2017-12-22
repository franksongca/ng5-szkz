import { Injectable, Inject, Optional, EventEmitter } from '@angular/core';
import { ZiService } from './zi.service';
import { CommonService } from './../common.service';
import { AudioLoaderService } from './../audio.manager.service';

@Injectable()
export class HanziSelectionService {
  static AudioBasePath = 'assets/media/Zi/';
  _hanzi; // Array
  _hanzi_id;
  _unique_hanzi_0;	// 没有相同字，同音字在同一组，但有同音字
  unique_hanzi_may_have_same_pron;
  _unique_hanzi_1;	// 从_unique_hanzi_0选取一组字后，将同音字放在一组，动态产生

  audioLoaderService: AudioLoaderService;

  onHanziCollectionReady: EventEmitter<any> = new EventEmitter();

  constructor(@Inject('options') @Optional() private pageContent: any) {
    this.audioLoaderService = new AudioLoaderService();
    this._hanzi_id = [];
    this._hanzi = [];

    this.audioLoaderService.onQueueLoaded.subscribe(() => {
      this.init();

      this.onHanziCollectionReady.emit();
    });

    const audioMenifest = [];
    pageContent.characters.forEach((c) => {
      const ch = new ZiService(c);
      if (ch.Spelling !== '') {
        // _hanzi[i] = new ZI(this.ziXML.zi[i]);
        this._hanzi.push(ch);
        this._hanzi_id.push(ch.ID);

        audioMenifest.push({id: ch.ID, src: HanziSelectionService.AudioBasePath + ch.spelling + '_' + ch.tone + '.mp3'});
      }
    });

    this.audioLoaderService.loadQueue(audioMenifest);

    // access server, to get each chinese character's credits the user has gotten in the past
    // and then dispatch a event


    // if(UserProfile.UserID == 0 || Configuration.MAIN == null || Configuration.RUNNING_LOCALLY) {
    //   if(Configuration.MAIN != null){
    //     Configuration.LOADING_LOGO.setText(Languages.SCREEN_TEXT[ArticleList.getArticle(Configuration.WenZhangIndex).Lang].logo_6);
    //     Configuration.LOADING_LOGO.showLogo();
    //   }
    //
    //   var delayDispatch:Timer = new Timer(3000, 1);
    //   delayDispatch.addEventListener(TimerEvent.TIMER_COMPLETE, handlerDelayDispatch);
    //   delayDispatch.start();
    //
    //   return;
    // } else {
    //   sendData(_hanzi_id.join(','));
    // }

  }

  static addIndex(selction: Array<ZiService>): Array<ZiService> {
    // var sl:Array = selction;
    const sl: Array<ZiService> = selction;

    for (let i = 0; i < sl.length; i++) {
      sl[i].Index = i;
    }

    return sl;
  }

  get ZiArray(): Array<ZiService> {
    return this._hanzi;
  }

  get PageContent(): any {
    return this.pageContent;
  }



  // static addIndexToXML(selction:XML):XML{
  //   var xml:XML = selction;
  //   for(var i=0; i<xml.zi.length(); i++){
  //     if(!xml.zi[i].hasOwnProperty("xu_hao")){
  //       xml.zi[i].@xu_hao = (i+1);
  //     }
  //   }
  //   return(xml)
  // }

  // static getZiArrayFromHanZi(hanZi: Array<ZiService>): Array<ZiService> {
  //   const zi: Array<ZiService> = new Array();
  //
  //   for (let i = 0; i < hanZi.length; i++) {
  //     zi.push(hanZi[i].ZiInfo);
  //   }
  //
  //   return(zi);
  // }

  // public static function getHanZiArrayFromZi(zi:Array):Array{
  //   var hanzi:Array = new Array();
  //   for(var i=0; i<zi.length; i++){
  //     hanzi.push(new HanZi(zi[i].ZiXML, true, [0]));
  //   }
  //   return(hanzi);
  // }

  searchAndAddUniquePronunciation(zi: ZiService): void {
    // 将同音字放在一个子数组项下
    let found: Boolean = false;

    for (let i = 0; i < this._unique_hanzi_1.length; i++) {
      if (this._unique_hanzi_1[i][0].equalsInSpelling(zi)) {
        // 同音字
        found = true;
        this._unique_hanzi_1[i].push(zi);
        break;
      }
    }

    if (!found) {
      const newZi: Array<ZiService> = new Array();
      newZi.push(zi);
      this._unique_hanzi_1.push(newZi);
    }
  }





  getUniqueZiMistakeNum(id): Array<any> {
    // Debug.append("getUniqueZiMistakeNum :: _hanzi.length="+_hanzi.length);
    let ret = [];

    for (let i = 0; i < this._hanzi.length; i++) {
      // Debug.append("getUniqueZiMistakeNum :: " + i + " : " + _hanzi[i].ID);
      if (this._hanzi[i].ID === id) {
        ret = [this._hanzi[i].Mistakes, this._hanzi[i].TimesTaken];
        break;
      }
    }

    return(ret);
  }

  grabMistakesInfo(zi: ZiService): ZiService {
    const newZi: ZiService = zi;
    for (let i = 0; i < this._hanzi.length; i++) {
      if (this._hanzi[i].equals(zi)) {
        newZi.ID = this._hanzi[i].ID;
        newZi.Mistakes = this._hanzi[i].Mistakes;
        newZi.TimesTaken = this._hanzi[i].TimesTaken;
        break;
      }
    }

    return(newZi);
  }

  init(): void {
    this._unique_hanzi_0 = [];
    for (let i = 0; i < this._hanzi.length; i++) {
      this.searchAndAddUnique(this._hanzi[i]);
    }
  }

  searchAndAddUnique(zi: ZiService): void {
    // 将多音字放在一个字数组项下，过虑掉相同字
    let found: Boolean = false;

    for (let i = 0; i < this._unique_hanzi_0.length; i++) {
      if (this._unique_hanzi_0[i][0].Word === zi.Word) {
        // 多音字或相同字
        found = true;
        let isSameWord: Boolean = false;
        for (let j = 0; j < this._unique_hanzi_0[i].length; j++) {
          if (this._unique_hanzi_0[i][j].Key === zi.Key) {
            // 相同字
            isSameWord = true;
            break;
          }
        }
        if (!isSameWord && zi.Tone !== 0) {	// 多音字且非轻声
          // 多音字
          this._unique_hanzi_0[i].push(zi);
        }
        break;
      }
    }
    // 如是唯一的轻声字，则选取。
    if (!found) {
      const newZi: Array<ZiService> = [];
      newZi.push(zi);
      this._unique_hanzi_0.push(newZi);
    }
  }

  getHighestMistakesFromArray(sub: Array<any>): ZiService {
    // Mistakes 是负值，它是正确得分（越负正确率越高），
    // 选取最大的 Mistakes，就是选取错误率最高者
    let mistakes: Number = -10000;
    let zi: ZiService = null;
    for (let j = 0; j < sub.length; j++) {
      if (sub[j].Mistakes > mistakes || (sub[j].Mistakes === mistakes && CommonService.getRandomNumber(0, 2) === 1)) {
        zi = sub[j];
        mistakes = zi.Mistakes;
      }
    }

    return(zi);
  }

  // 在相同字中选取错误指标值最高的字，选取的汉字中没有相同字，但可能有同音字
  getSelectionMayHaveSamePronunciation(): Array<any> {
    const selectionZi = new Array(this._unique_hanzi_0.length);

    for (let i = 0; i < this._unique_hanzi_0.length; i++) {
      const sub = this._unique_hanzi_0[i];
      if (sub.length === 1) {
        selectionZi[i] = sub[0];
      } else {
        selectionZi[i] = this.getHighestMistakesFromArray(sub);
      }
    }

    return(selectionZi);
  }

  // 根据汉字错误指标值，选取头N个汉字，选取的汉字中没有相同字和同音字，并（随机）排序，如果不足N个汉字，
  // 则在选中汉字中选取错误指标值较高的汉字补充进选取的汉字集，这样肯定有重复的字
  getSelectionUniquePronunciationMustN(randomization: Boolean, mustElements: number) {
    let unique_pron = this.getSelectionUniquePronunciationFirstN(false, mustElements);

    if (unique_pron.length < mustElements) {
      unique_pron = unique_pron.concat(unique_pron);
      unique_pron = unique_pron.concat(unique_pron);	// 由于允许的最少汉字是5个，而台球要求15个汉字，故重复两次，
      // 确保足够的字数。目前只有台球游戏调用该函数
    }

    while (unique_pron.length > mustElements) {
      unique_pron.pop();
    }

    if (randomization) {
      unique_pron = CommonService.getRandomizedArray(unique_pron);
    }
    return(unique_pron);
  }

  // 根据汉字错误指标值，选取头N个汉字，选取的汉字中没有相同字和同音字，并（随机）排序
  getSelectionUniquePronunciationFirstN(randomization: Boolean, firstElements: number): Array<any> {
    let unique_pron: Array<ZiService> = this.getSelectionUniquePronunciation(false);

    for (let i = 0; i < unique_pron.length - 1; i++) {
      let ele0: ZiService = unique_pron[i];
      for (let j = i + 1; j < unique_pron.length; j++) {
        if (ele0.Mistakes > unique_pron[j].Mistakes) {	// 修改条件 if(ele0.Mistakes < unique_pron[j].Mistakes) 为
          unique_pron[i] = unique_pron[j];			// if(ele0.Mistakes > unique_pron[j].Mistakes)，选取错误率
          unique_pron[j] = ele0;						// 较高者！！！ Aug 13, 2012

          ele0 = unique_pron[i];
        }
      }
    }

    while (unique_pron.length > firstElements) {
      unique_pron.pop();
    }

    if (randomization) {
      unique_pron = CommonService.getRandomizedArray(unique_pron);
    }
    return(unique_pron);
  }

  // 选取的汉字中没有相同字和同音字，（随机）排序
  getSelectionUniquePronunciation(randomization: Boolean): Array<ZiService> {
    const unique_hanzi_may_have_same_pron: Array<ZiService> = this.getSelectionMayHaveSamePronunciation();

    this._unique_hanzi_1 = [];
    for (let i = 0; i < unique_hanzi_may_have_same_pron.length; i++) {
      this.searchAndAddUniquePronunciation(unique_hanzi_may_have_same_pron[i]);
    }

    let selectionZi: Array<ZiService> = new Array(this._unique_hanzi_1.length);

    for (let i = 0; i < this._unique_hanzi_1.length; i++) {
      const sub: Array<ZiService> = this._unique_hanzi_1[i];
      if (sub.length === 1) {
        selectionZi[i] = sub[0];
      } else {
        selectionZi[i] = this.getHighestMistakesFromArray(sub);
      }
    }

    if (randomization) {
      selectionZi = CommonService.getRandomizedArray(selectionZi);
    }

    return(selectionZi);
  }


  // private function onIOError(event:IOErrorEvent):void {
  //   trace("Error loading URL.");
  //   if(Configuration.MAIN != null){
  //     Configuration.LOADING_LOGO.setText("与服务器连接时发生错误，请稍候再运行...");
  //   }
  // }




  // handlerDelayDispatch(e:TimerEvent): void {
  //   for (let i = 0; i < _hanzi.length; i++) {
  //     this._hanzi[i].Mistakes = 0;
  //     this._hanzi[i].TimesTaken = 0;
  //   }
  //
  //   // TODO:
  //   // if(Configuration.MAIN != null){
  //   //   Configuration.LOADING_LOGO.hideLogo();
  //   // }
  //
  //   dispatchEvent(new CustomEvent(CustomEvent.HAN_ZI_SELECTED, false, false));
  // }

  // public function sendData(_hanzi_id:String):void {
  //   if(Configuration.MAIN != null){
  //     Configuration.LOADING_LOGO.setText("正在下载文字数据，请等待...");
  //     Configuration.LOADING_LOGO.showLogo();
  //   }
  //
  //   Debug.append("sendData to"+(ArticleList.DomanURL + Configuration.ServerPath_GrabWordsInfo));
  //   //
  //   var request:URLRequest = new URLRequest(ArticleList.DomanURL + Configuration.ServerPath_GrabWordsInfo);
  //   var _vars:URLVariables = new URLVariables();
  //
  //   _vars.UserID = UserProfile.UserID;
  //   _vars.NikeName = UserProfile.Name;
  //
  //   _vars.EnscriptCode = Configuration.EnscriptCode;
  //   _vars.WordsIDs = _hanzi_id;//encodeURIComponent(_hanzi_id);// .toXMLString();
  //
  //   var loader:URLLoader = new URLLoader();
  //   loader.dataFormat = URLLoaderDataFormat.VARIABLES;
  //   request.data = _vars;
  //   request.method = URLRequestMethod.POST;
  //   loader.addEventListener(Event.COMPLETE, handleSendComplete);
  //   loader.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
  //   loader.load(request);
  // }




}
