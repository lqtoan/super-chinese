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
    height: '6rem'
  };
  currentPage: number = 1;
  selectedAudio?: Audio;

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }
}
