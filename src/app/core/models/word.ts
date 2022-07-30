export class Word {
  constructor(name: string, define: string, pinyin: string) {
    this.name = name;
    this.pinyin = pinyin;
    this.define = define;
  }

  name: string;
  pinyin: string;
  define: string;
}
