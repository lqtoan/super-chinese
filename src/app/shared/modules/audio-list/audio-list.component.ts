import { AudioListStore } from './audio-list.store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Audio } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AudioListStore],
})
export class AudioListComponent {
  @Input() audios: Audio[] = [];
  @Input() isLoading: boolean = false;
  currentPage: number = 1;

  readonly vm$ = this._store.vm$;

  constructor(private readonly _store: AudioListStore) {}

  onSelect(audio: Audio): void {
    this._store.selectAudio(audio);
  }
}
