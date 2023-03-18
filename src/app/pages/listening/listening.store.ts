import { HttpErrorResponse } from '@angular/common/http';
import { AudioService } from '@services/audio.service';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';
import { AudioType } from '@enums/audio-type.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

export interface ListeningState {
  isLoading: boolean | null;
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
  constructor(
    private readonly _service: AudioService,
    private readonly _message: NzMessageService,
    private readonly _translateService: TranslateService
  ) {
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
              this.patchState({ data: data, isLoading: false });
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.message);
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
                // this._message.error(err + '\nPlease contact admin!');
              })
              .finally();
          controls.src = audio.url;
          this.patchState({ isPlaying: true, selectedAudio: audio });
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
  readonly loadAudio = this.effect<Audio | undefined>(($) =>
    $.pipe(
      switchMap((audio) =>
        this._service.getAudioEvent(audio).pipe(
          tapResponse(
            (event) => {
              if (audio) {
                console.log(event.total);

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
              }
            },
            (err) => {}
          )
        )
      )
    )
  );
  //#endregion
}
