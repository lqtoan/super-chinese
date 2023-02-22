import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';
import { AudioType } from '@enums/audio-type.enum';

export interface ListeningState {
  isLoading: boolean;
  data: Audio[];
}

const initialState = {
  isLoading: true,
  data: [],
};

@Injectable()
export class ListeningStore extends ComponentStore<ListeningState> {
  constructor(private readonly _service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ data, isLoading }) => ({ data, isLoading }), {
    debounce: true,
  });
  readonly tabIndex$ = this._service.currentTab$;
  readonly typeIndex$ = this._service.currentType$;

  //#region Updater
  setTabIndex(index: number) {
    this._service.changeTabIndex(index);
  }
  setType(type: AudioType) {
    this._service.changeAudioType(type);
  }
  //#endregion

  //#region Effect
  readonly loadData = this.effect<[number, AudioType]>(($) =>
    $.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(([index, type]) =>
        this._service.getAllAudios(index, type).pipe(
          tapResponse(
            (data) => {
              data.forEach((audio) => {
                audio.type = type === 'CURRICULUM' ? 'CURRICULUM' : 'EXERCISE';
                audio.grade = `hsk ${index + 1}`;
              });
              this.patchState({ data: data });
            },
            (err) => { }
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
  //#endregion
}
