import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Audio, AudioConfiguration } from '@models/audio';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent implements OnInit, OnChanges {
  // @Input() audioList: Audio[] = [];
  // @Input() audioHeight: string = '6rem';

  @Input() audio: AudioConfiguration = {
    list: [],
    height: '6rem'
  };
  currentPage: number = 1;
  selectedAudio?: Audio;

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }

  ngOnInit() {
    console.log('on init', this.audio);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes', this.audio);
  }
}
