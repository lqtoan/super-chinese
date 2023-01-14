import { Component, Input } from '@angular/core';
import { Audio, AudioConfiguration } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent {
  @Input() audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };
  currentPage: number = 1;
  selectedAudio?: Audio;
  isPlaying: boolean = false;

  onSelect(audio: Audio): void {
    if (this.selectedAudio === audio && this.isPlaying) {
      this.onPause();
      this.isPlaying = false;
    } else {
      this.onPlay(audio);
      this.isPlaying = true;
    }
  }

  onPause() {
    const controls = <HTMLVideoElement>document.querySelector('#audioControls');
    controls.pause();
    this.isPlaying = false;
  }

  onPlay(audio: Audio) {
    this.selectedAudio = audio;
    const controls = <HTMLVideoElement>document.querySelector('#audioControls');
    controls.play();
    this.isPlaying = true;
  }
}
