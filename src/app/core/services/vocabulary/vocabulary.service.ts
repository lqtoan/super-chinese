import { Vocabulary } from '@models/vocabulary';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HSK1_VOCABULARY } from './mock-hsk1-vocabulary';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  hsk1Vocabulary: Vocabulary[] = HSK1_VOCABULARY;

  constructor() {}

  getHsk1Vocabulary(): Observable<Vocabulary[]> {
    return of(this.hsk1Vocabulary).pipe(delay(50));
  }
}
