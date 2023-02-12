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
  @Input() isLoading: boolean = false;
  currentPage: number = 1;

  readonly vm$ = this.store.vm$;

  constructor(private readonly store: AudioListStore) {}

  ngOnInit() {
    this.vm$.subscribe((res) => {
      console.log(res.progress);
    });
  }

  onSelect(audio: Audio): void {
    this.store.selectAudio(audio);
  }
}
