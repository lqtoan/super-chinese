import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';

export interface ExerciseState {
  data: Audio[];
}

const initialState = {
  data: [],
};

@Injectable()
export class ExerciseStore extends ComponentStore<ExerciseState> {
  constructor(private readonly service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ data }) => ({ data }), {
    debounce: true,
  });
  readonly tabIndex$ = this.service.currentTab$;

  //#region Updater
  setTabIndex(index: number) {
    this.service.changeTabIndex(index);
  }
  //#endregion

  //#region Effect
  readonly loadData = this.effect<number>(($) =>
    $.pipe(
      switchMap((index) =>
        this.service.getAllExercises(index).pipe(
          tapResponse(
            (data) => {
              data.forEach((audio) => {
                audio.type = 'EXERCISE';
                audio.grade = `hsk ${index + 1}`;
              });
              this.patchState({ data: data });
            },
            (error) => {}
          )
        )
      )
    )
  );
  //#endregion
}
