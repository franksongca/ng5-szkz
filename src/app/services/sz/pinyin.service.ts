import { Injectable } from '@angular/core';

@Injectable()
export class PinyinService {
  static YunMu = [
    // [韵母，声调位置]
    ['iong', 2], ['ueng', 2], ['ieng', 2], ['uang', 2], ['iang', 2], // no ['ueng', 2], ['ieng', 2] in the real world, should remove them!!!
    ['ang', 1], ['eng', 1], ['ong', 1], ['ven', 1], ['ien', 2], ['uan', 2], ['van', 2], ['ian', 2], ['iou', 2], ['iao', 2], ['uai', 2],
    ['ia', 2], ['ua', 2], ['uo', 2], ['ie', 2], ['ve', 2], ['er', 1], ['ai', 1], ['ei', 1], ['ui', 2], ['ao', 1], ['ou', 1], ['an', 1], ['en', 1], ['un', 1],
    // iou，uei，uen前面加声母的时候，写成iu，ui，un。例如niu（牛），gui（归），lun（论）
    ['iu', 2],

    ['a', 1], ['o', 1], ['e', 1], ['i', 1], ['u', 1], ['v', 1]
  ];

  static ShengMu = [
    'zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's',

    // i列的韵母，前面没有声母的时候，写成yi（衣），ya（呀），ye（耶），yao（腰），you（优），yan（烟），yin（因），yang（央），ying（英），yong（雍）。
    // ü列的韵母，前面没有声母的时候，写成yu（迂），yue（约），yuan（冤），yun（晕）。
    'y',
    // u列的韵母，前面没有声母的时候写成wu（乌），wa（蛙），wo（窝），wai（歪），wei（威），wan（弯），wen（温），wang（汪），weng（翁）。
    'w'
  ];

  static vowelList = ['a', 'o', 'e', 'i', 'u', 'v', 'ai', 'ao', 'an', 'ang', 'ia', 'iao', 'ie', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'ei', 'en', 'eng', 'ou', 'ong', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 've', 'van', 'vn', 'er'];
  static consonantList = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'z', 'c', 's', 'zh', 'ch', 'sh', 'r', 'y', 'w', 'none'];
  static cvMatchingList = {
    'b': '-a-o-i-u-ai-ao-an-ang-iao-ie-ian-in-ing-ei-en-eng-',
    'p': '-a-o-i-u-ai-ao-an-ang-iao-ie-ian-in-ing-ei-en-eng-',
    'm': '-a-e-o-i-u-ai-ao-an-ang-ei-en-eng-ou-iao-ie-iu-ian-in-ing-ei-en-',
    'f': '-a-o-u-an-ang-ei-en-eng-ou-',
    'd': '-a-e-i-u-ai-ao-an-ang-ia-iao-ie-iu-ian-ing-ei-en-eng-ou-ong-uo-ui-uan-un-',
    't': '-a-e-i-u-ai-ao-an-ang-iao-ie-ian-ing-ei-eng-ou-ong-ui-uan-un-',
    'n': '-a-e-i-u-v-ai-ao-an-ang-iao-ie-iu-ian-in-iang-ei-en-eng-ou-ong-uo-uan-un-ve-',
    'l': '-a-e-i-u-v-ai-ao-an-ang-ia-iao-ie-iu-ian-in-iang-ing-ei-eng-ou-ong-uo-uan-un-ve-',
    'g': '-a-e-u-ai-ao-an-ang-ei-en-eng-ou-ong-ua-uo-uai-ui-uan-un-uang-',
    'k': '-a-e-u-ai-ao-an-ang-ei-en-eng-ou-ong-ua-uo-uai-ui-uan-un-uang-',
    'h': '-a-e-u-ai-ao-an-ang-ei-en-eng-ou-ong-ua-uo-uai-ui-uan-un-uang-',
    'j': '-i-v-ia-iao-ie-iu-ian-in-iang-ing-iong-ve-van-vn-',
    'q': '-i-v-ia-iao-ie-iu-ian-in-iang-ing-iong-ve-van-vn-',
    'x': '-i-v-ia-iao-ie-iu-ian-in-iang-ing-iong-ve-van-vn-',   // '-i-u-v-ia-iao-ie-iu-ian-in-iang-ing-iong-uan-un-ve-van-vn-',
    'z': '-a-e-i-u-ai-ao-an-ang-ei-en-eng-ou-ong-uo-uai-ui-uan-un-',
    'c': '-a-e-i-u-ai-ao-an-ang-ei-en-eng-ou-ong-uo-ui-uan-un-',
    's': '-a-e-i-u-ai-ao-an-ang-en-eng-ou-ong-uo-ui-uan-un-',
    'zh': '-a-e-i-u-ai-ao-an-ang-ei-en-eng-ou-ong-ua-uo-uai-ui-uan-un-uang-',
    'ch': '-a-e-i-u-ai-ao-an-ang-en-eng-ou-ong-ua-uo-uai-uan-un-uang-',
    'sh': '-a-e-i-u-ai-ao-an-ang-ei-en-eng-ou-ua-uo-uai-ui-uan-un-uang-',
    'r': '-e-i-u-ao-an-ang-en-eng-ou-ong-ua-uo-uan-un-',
    'y': '-a-e-i-v-ao-an-ang-in-ing-ou-ong-ve-van-vn-', // '-a-o-e-i-u-v-ao-an-ang-in-ing-ou-ong-uan-un-ve-van-vn-',
    'w': '-a-o-u-ai-an-ang-ei-en-eng-',
    'none': '-a-o-e-ai-ao-an-ang-ei-en-eng-ou-er-'
  };
  static YunMuCodeHTML = {
    'a': ['ā', 'á', 'ǎ', 'à'],
    'e': ['ē', 'é', 'ě', 'è'],
    'i': ['ī', 'í', 'ǐ', 'ì'],
    'o': ['ō', 'ó', 'ǒ', 'ò'],
    'u': ['ū', 'ú', 'ǔ', 'ù'],
    'v': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
  };
  constructor() { }

  static getYunMuLetter(letter, tone, sm, ym) {
    if (tone === -1) {
      return '';
    }
    // console.log('tone = ' + letter + ',' + tone + ',' + sm + ',' + ym);

    if (letter === 'v' && (ym.substr(0, 1) === 'v' && (sm === 'j' || sm === 'q' || sm === 'x' || sm === 'y'))) {
      return PinyinService.YunMuCodeHTML['u'][tone];
    } else {
      return PinyinService.YunMuCodeHTML[letter][tone];
    }
  }

  static GetPinYinYunMuPosition(word) {
    let ret = -1;
    for (let i = 0; i < PinyinService.YunMu.length; i++) {
      ret = word.indexOf(PinyinService.YunMu[i][0]);
      if (ret >= 0) {
        break;
      }
    }
    return(ret);
  }

  static GetPinYinTonePosition(word) {
    let ret = -1;
    // see if 拼音＝＝韵母
    for (let i = 0; i < PinyinService.YunMu.length; i++) {
      const p = word.indexOf(PinyinService.YunMu[i][0]);
      if (p >= 0) {
        ret = p + Number(PinyinService.YunMu[i][1]);
        break;
      }
    }
    return(ret);
  }

  static GetPinYinToneLetter(word) {
    const p = PinyinService.GetPinYinTonePosition(word);
    let letter = '';
    if (p !== -1) {
      letter = word.substr(p - 1, 1);
    }
    return(letter);
  }

  /*
   * build pinyin letters
   * @param {Object}
   *   {
   *      marginTop: 15.45,
   *      pinyin: 'zhi',
   *      shengMuColor: 'blue',
   *      size: 35.97,
   *      tone: '1',
   *      yunMuColor: '#990000'
   *  }
   *
   * @ return { Array }
   *   [
   *       {
   *           'letter':'z',
   *           'size':36,
   *           'color':'blue',
   *           'type':'s',
   *           'originalLetter':'z',
   *           'read':'zh',
   *           'marginTop':15.45
   *       },{
   *           'letter':'h',
   *           'size':36,
   *           'color':'blue',
   *           'type':'s',
   *           'originalLetter':'h',
   *           'read':'zh',
   *           'marginTop':15.45
   *       },{
   *           'letter':'ī',
   *           'size':36,
   *           'color':'#990000',
   *           'type':'yt',
   *           'originalLetter':'i',
   *           'read':'i',
   *           'marginTop':15.45
   *       }
   *   ]
   */
  static buildPinYin(options) {
    const py = options.pinyin,
      tone = options.tone,
      ymp = this.GetPinYinYunMuPosition(py),
      sm = py.substring(0, ymp),
      ym = py.substring(ymp, py.length),
      tp = this.GetPinYinTonePosition(py),
      c = py.substr(tp - 1, 1),
      wc = this.GetPinYinToneLetter(py),
      wct = tone === 0 ? (wc === 'v' ? 'ü' : wc) : this.getYunMuLetter(wc, tone - 1, sm, ym),
      pyCollection = [];

    for (let i = 0; i < py.length; i++) {
      const lt = py.substr(i, 1);
      if (i < ymp) {
        pyCollection.push({
          'letter': lt,
          'size': options.size,
          'color': options.shengMuColor,
          'type': 's',
          'originalLetter': lt,
          'read': sm,
          'marginTop': options.marginTop
        });
      } else {
        if (i === tp - 1) {
          pyCollection.push({
            'letter': wct,
            'size': options.size,
            'color': options.yunMuColor,
            'type': 'yt',
            'originalLetter': lt,
            'read': ym,
            'marginTop': options.marginTop
          });
        } else {
          pyCollection.push({
            'letter': lt === 'v' ? (sm !== 'n' && sm !== 'l' ? 'u' : 'ü') : lt,    // 韵母 ü 前面是声母不是 n,l 时，去掉上面的点
            'size': options.size,
            'color': options.yunMuColor,
            'type': 'y',
            'originalLetter': lt,
            'read': ym,
            'marginTop': options.marginTop
          });
        }
      }
    }
    return pyCollection;
  }
}
