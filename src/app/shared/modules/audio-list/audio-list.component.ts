import { Component, Input, OnInit } from '@angular/core';
import { Audio } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent implements OnInit {
  @Input() audios: Audio[] = [];
  @Input() isLoading: boolean = false;
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
    const controls = <HTMLVideoElement>document.querySelector('#audioControls');
    this.selectedAudio = audio;
    if (!this.isPlaying) controls.play();
    this.isPlaying = true;
  }
}
