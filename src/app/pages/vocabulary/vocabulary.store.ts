import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Vocabulary } from '@models/vocabulary.model';
import { VocabularyService } from '@services/vocabulary.service';
import { finalize, switchMap, tap } from 'rxjs/operators';

export interface VocabularyState {
  isLoading: boolean;
  hsk1: Vocabulary[];
  hsk2: Vocabulary[];
}

const initialState = {
  isLoading: false,
  hsk1: [],
  hsk2: [],
};

@Injectable()
export class VocabularyStore extends ComponentStore<VocabularyState> {
  constructor(private readonly service: VocabularyService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, hsk1, hsk2 }) => ({ isLoading, hsk1, hsk2 }), { debounce: true });

  readonly loadHsk1 = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getHsk1Vocabulary().pipe(
          tapResponse(
            (data) => {
              this.patchState({ hsk1: data });
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );

  readonly loadHsk2 = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getHsk2Vocabulary().pipe(
          tapResponse(
            (data) => {
              this.patchState({ hsk2: data });
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );
}
