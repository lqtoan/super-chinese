import { Vocabulary } from './../../models/vocabulary';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { hsk1Vocabulary } from './mock-hsk1-vocabulary';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  hsk1Vocabulary: Vocabulary[] = hsk1Vocabulary;

  constructor() {}

  getHsk1Vocabulary(): Observable<Vocabulary[]> {
    return of(this.hsk1Vocabulary).pipe(delay(50));
  }
}
