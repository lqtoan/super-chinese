import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';

export interface CurriculumState {
  isLoading: boolean;
  data: Audio[];
}

const initialState = {
  isLoading: true,
  data: [],
};

@Injectable()
export class CurriculumStore extends ComponentStore<CurriculumState> {
  constructor(private readonly service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ data, isLoading }) => ({ data, isLoading }), {
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
      tap(() => this.patchState({ isLoading: true })),
      switchMap((index) =>
        this.service.getAllCurriculums(index).pipe(
          tapResponse(
            (data) => {
              data.forEach((audio) => {
                audio.type = 'CURRICULUM';
                audio.grade = `hsk ${index + 1}`;
              });
              this.patchState({ data: data });
            },
            (err) => {}
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
  //#endregion
}
