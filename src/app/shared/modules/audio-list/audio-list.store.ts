import { DEFAULT_DEBOUNCE_TIME } from './../../../core/common/default-debounce-time.const';
import { HttpProgressEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { tap, switchMap, delay } from 'rxjs/operators';
import { Audio } from '@models/audio.model';
import { AudioService } from '@services/audio.service';

export interface AudioListState {
  selectedAudio?: Audio;
  isPlaying: boolean;
  progress: { type: number; loaded: number; total: number; percent: number };
}

const initialState = {
  selectedAudio: undefined,
  isPlaying: false,
  progress: { type: 0, loaded: 0, total: 0, percent: 0 },
};

@Injectable()
export class AudioListStore extends ComponentStore<AudioListState> {
  constructor(private readonly _audioService: AudioService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ selectedAudio, isPlaying, progress }) => ({ selectedAudio, isPlaying, progress }), {
    debounce: true,
  });
  readonly getSelectedAudio = (): Audio | undefined => this.get().selectedAudio;
  readonly getIsPlaying = (): boolean => this.get().isPlaying;

  //#region Updater

  //#endregion

  //#region Effect
  readonly selectAudio = this.effect<Audio>(($) =>
    $.pipe(
      tap((audio) => {
        if (this.getSelectedAudio() === audio && this.getIsPlaying()) {
          this.stop();
        } else {
          this.load(audio);
          this.play();
        }
        this.patchState({ selectedAudio: audio });
      })
    )
  );
  readonly play = this.effect(($) =>
    $.pipe(
      tap(() => {
        const controls = <HTMLAudioElement>document.querySelector('#audioControls');
        if (!this.getIsPlaying())
          controls
            .play()
            .then()
            .catch((err) => console.log(err))
            .finally();

        this.patchState({ isPlaying: true });
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
        this._audioService.load(audio).pipe(
          tapResponse(
            (event) => {
              fetch(`${audio.url}`).then((res) => (event.total = res.headers.get('content-length')));
              console.log(event);
              this.patchState({
                progress: {
                  type: event.type,
                  loaded: event.loaded,
                  total: event.total,
                  percent: event.type === 4 ? 100 : Math.round((100 * (100.0 * event.loaded)) / event.total) / 100,
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
