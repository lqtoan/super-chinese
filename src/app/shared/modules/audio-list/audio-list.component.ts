import { Component, Input, OnInit } from '@angular/core';
import { Audio, AudioConfiguration } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent implements OnInit {
  @Input() audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };
  currentPage: number = 1;
  selectedAudio?: Audio;
  isPlaying: boolean = false;

  ngOnInit() {}

  onSelect(audio: Audio): void {
    this.selectedAudio === audio && this.isPlaying ? this.onPause() : this.onPlay(audio);
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
