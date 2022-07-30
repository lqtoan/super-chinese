import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Audio } from 'src/app/core/models/audio';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent implements OnInit {
  @Input() audioList: Audio[] = [];
  currentPage: number = 1;
  selectedAudio?: Audio;

  constructor() {}

  ngOnInit(): void {}

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }
}
