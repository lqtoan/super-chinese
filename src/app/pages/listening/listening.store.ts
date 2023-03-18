import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';
import { AudioType } from '@enums/audio-type.enum';

export interface ListeningState {
  isLoading: boolean;
  data: Audio[];
  selectedAudio: Audio | null;
  isPlaying: boolean;
  progress: { type: number; loaded: number; total: number; percent: number };
}

const initialState = {
  isLoading: true,
  data: [],
  selectedAudio: null,
  isPlaying: false,
  progress: { type: 0, loaded: 0, total: 1, percent: 0 },
};

@Injectable()
export class ListeningStore extends ComponentStore<ListeningState> {
  constructor(private readonly _service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(
    ({ data, isLoading, selectedAudio, isPlaying, progress }) => ({
      data,
      isLoading,
      selectedAudio,
      isPlaying,
      progress,
    }),
    {
      debounce: true,
    }
  );

  //#region Updater
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
            (err) => {}
          ),
          finalize(() => this.patchState({ isLoading: false }))
        )
      )
    )
  );
  readonly play = this.effect<Audio>(($) =>
    $.pipe(
      tap((audio) => {
        const controls = <HTMLAudioElement>document.querySelector('#audioControls');
        controls
          .play()
          .then()
          .catch((err) => console.log(err))
          .finally();
        controls.src = audio.url;

        this.patchState({ isPlaying: true, selectedAudio: audio });
      })
    )
  );
  readonly stop = this.effect(($) =>
    $.pipe(
      tap(() => {
        const controls = <HTMLAudioElement>document.querySelector('#audioControls');
        controls.pause();
        this.patchState({ isPlaying: false });
      })
    )
  );
  readonly load = this.effect<Audio>(($) =>
    $.pipe(
      switchMap((audio) =>
        this._service.getAudioEvent(audio).pipe(
          tapResponse(
            (event) => {
              this.patchState({
                progress: {
                  type: event.type,
                  loaded: event.loaded,
                  total: audio.size,
                  percent:
                    event.type === 0
                      ? 0
                      : event.type === 4
                      ? 100
                      : Math.round((100 * (100.0 * event.loaded)) / audio.size) / 100,
                },
              });
            },
            (err) => {}
          )
        )
      )
    )
  );
  //#endregion
}
