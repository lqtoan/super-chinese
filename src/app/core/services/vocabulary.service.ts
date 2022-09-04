import { Vocabulary } from '@models/vocabulary.model';
import { Injectable } from '@angular/core';
import { Observable, of, delay, Subject, tap } from 'rxjs';
import { HSK1_VOCABULARY } from '@data/mock-hsk1-vocabulary';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  hsk1Vocabulary: Vocabulary[] = HSK1_VOCABULARY;

  constructor() {}

  private vocabularySubject$ = new Subject<Vocabulary[]>();
  hsk1Vocabulary$ = this.vocabularySubject$.asObservable();

  getHsk1Vocabulary(): Observable<Vocabulary[]> {
    return of(this.hsk1Vocabulary).pipe(
      delay(500),
      tap((res) => this.vocabularySubject$.next(res))
    );
  }
}
