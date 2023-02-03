import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';

export interface ExerciseState {
  isLoading: boolean;
  hsk1?: Audio[];
  hsk2?: Audio[];
  hsk3?: Audio[];
}

const initialState = {
  isLoading: false,
  hsk1: undefined,
  hsk2: undefined,
  hsk3: undefined,
};

@Injectable()
export class ExerciseStore extends ComponentStore<ExerciseState> {
  constructor(private readonly service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, hsk1, hsk2, hsk3 }) => ({ isLoading, hsk1, hsk2, hsk3 }), {
    debounce: true,
  });

  readonly loadHsk1 = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.service.getHsk1ExerciseAudioList().pipe(
          tapResponse(
            (data: Audio[]) => {
              data.forEach((audio) => {
                audio.type = 'EXERCISE';
                audio.grade = 'hsk 1';
              });
              this.patchState({ hsk1: data });
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
  readonly loadHsk2 = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.service.getHsk2ExerciseAudioList().pipe(
          tapResponse(
            (data: Audio[]) => {
              data.forEach((audio) => {
                audio.type = 'EXERCISE';
                audio.grade = 'hsk 2';
              });
              this.patchState({ hsk2: data });
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
  readonly loadHsk3 = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.service.getHsk3ExerciseAudioList().pipe(
          tapResponse(
            (data: Audio[]) => {
              data.forEach((audio) => {
                audio.type = 'EXERCISE';
                audio.grade = 'hsk 3';
              });
              this.patchState({ hsk3: data });
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
}
