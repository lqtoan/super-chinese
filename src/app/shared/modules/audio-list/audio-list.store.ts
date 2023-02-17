import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { tap, switchMap } from 'rxjs/operators';
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
  progress: { type: 0, loaded: 0, total: 1, percent: 0 },
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
          this.play();
          this.load(audio);
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
        this._audioService.getAudioEvent(audio).pipe(
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
