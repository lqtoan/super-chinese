import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Audio } from 'src/app/core/models/audio';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent {
  @Input() audioList: Audio[] = [];
  @Input() audioHeight: string = '6rem';
  currentPage: number = 1;
  selectedAudio?: Audio;

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }
}
