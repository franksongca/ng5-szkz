import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class HanziSelectionService {

  constructor(@Inject('options') @Optional() private pageCharacters: any) {

    let _hanzi = [];
    let _hanzi_id = [];

    pageCharacters.forEach((c) => {
      if (c.pinYin !== '') {

      }
    });

      // for(var i=0; i<this.ziXML.zi.length(); i++){
      //   if(this.ziXML.zi[i].attribute("pin_yin") != ""){
      //     //_hanzi[i] = new ZI(this.ziXML.zi[i]);
      //     _hanzi.push(new ZI(this.ziXML.zi[i]));
      //     _hanzi_id.push(this.ziXML.zi[i].attribute("id"));
      //   }
      // }


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



}
