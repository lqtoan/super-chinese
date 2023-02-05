import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs/operators';
import { Audio } from '@models/audio.model';

export interface AudioListState {
  selectedAudio?: Audio;
  isPlaying: boolean;
  isLoading: boolean;
}

const initialState = {
  selectedAudio: undefined,
  isPlaying: false,
  isLoading: false,
};

@Injectable()
export class AudioListStore extends ComponentStore<AudioListState> {
  constructor() {
    super(initialState);
  }

  readonly vm$ = this.select(({ selectedAudio, isPlaying }) => ({ selectedAudio, isPlaying }), {
    debounce: true,
  });
  readonly getSelectedAudio = (): Audio | undefined => this.get().selectedAudio;
  readonly getIsPlaying = (): boolean => this.get().isPlaying;
  readonly getIsLoading = (): boolean => this.get().isLoading;

  //#region Updater

  //#endregion

  //#region Effect
  readonly selectAudio = this.effect<Audio>(($) =>
    $.pipe(
      tap((audio) => {
        this.getSelectedAudio() === audio && this.getIsPlaying() ? this.stop() : this.play();
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
        controls.currentTime = 0;
        this.patchState({ isPlaying: false });
      })
    )
  );
  //#endregion
}
