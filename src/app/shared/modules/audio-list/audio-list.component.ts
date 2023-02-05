import { AudioListStore } from './audio-list.store';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Audio } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioListStore],
})
export class AudioListComponent implements OnInit {
  @Input() audios: Audio[] = [];
  currentPage: number = 1;

  readonly vm$ = this.store.vm$;

  constructor(private readonly store: AudioListStore) {}

  ngOnInit() {}

  onSelect(audio: Audio): void {
    this.store.selectAudio(audio);
  }
}
