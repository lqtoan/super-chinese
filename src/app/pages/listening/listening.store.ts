import { HttpErrorResponse } from '@angular/common/http';
import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';
import { AudioType } from '@enums/audio-type.enum';

export interface ListeningState {
  data: Audio[];
  isLoading: boolean | null;
  isPlaying: boolean;
  progress: { type: number; loaded: number; total: number; percent: number };
}

const initialState = {
  data: [],
  isLoading: true,
  isPlaying: false,
  progress: { type: 0, loaded: 0, total: 1, percent: 0 },
};

@Injectable()
export class ListeningStore extends ComponentStore<ListeningState> {
  constructor(private readonly _service: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(
    ({ data, isLoading, isPlaying, progress }) => ({
      data,
      isLoading,
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
              this.patchState({ data: data, isLoading: false });
            },
            (err: HttpErrorResponse) => {
              console.log(err.message);
            }
          ),
          finalize(() => this.patchState({ isLoading: null }))
        )
      )
    )
  );
  readonly playAudio = this.effect<Audio | undefined>(($) =>
    $.pipe(
      tap((audio) => {
        if (audio) {
          const controls = <HTMLAudioElement>document.querySelector('#audioControls');
          if (!this.get().isPlaying)
            controls
              .play()
              .then()
              .catch((err) => {
                console.log(err.message);
                // this._message.error(err + '\nPlease contact admin!');
              })
              .finally();
          controls.src = audio.url;
          this.patchState({ isPlaying: true });
        }
      })
    )
  );
  readonly stopAudio = this.effect(($) =>
    $.pipe(
      tap(() => {
        const controls = <HTMLAudioElement>document.querySelector('#audioControls');
        controls.pause();
        this.patchState({ isPlaying: false });
      })
    )
  );
  readonly loadAudio = this.effect<Audio>(($) =>
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
                      : Math.round((10 * (100.0 * event.loaded)) / audio.size) / 10,
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
