import { Word } from './word';

export class Vocabulary {
  constructor(title: string, words: Word[]) {
    this.name = title;
    this.words = words;
  }

  name: string;
  words: Word[];
}
