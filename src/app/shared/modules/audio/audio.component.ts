import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { Audio } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent {
  @Input() audios: Audio[] = [];
  @Input() isLoading: boolean = false;
  @Input() currentPage: number = 1;
  @Input() url: string;
  @Input() title: string;
  @Input() isPlaying: boolean = false;
  @Input() progress: { type: number; loaded: number; total: number; percent: number };

  @Output() pageChange = new EventEmitter<number>();
  @Output() playAudio = new EventEmitter<Audio>();
  @Output() pauseAudio = new EventEmitter();
  @Output() playing = new EventEmitter();
  @Output() pause = new EventEmitter();
  @Output() share = new EventEmitter<Audio>();

  constructor() {}
}
