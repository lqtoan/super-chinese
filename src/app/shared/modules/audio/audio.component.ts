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
  @Input() selectedAudio: Audio;
  @Input() url: string;
  @Input() title: string;
  @Input() isPlaying: boolean = false;
  @Input() progress: any;

  @Output() pageChange = new EventEmitter<number>();
  @Output() selectAudio = new EventEmitter<Audio>();
  @Output() playAudio = new EventEmitter<Audio>();
  @Output() pauseAudio = new EventEmitter();
  @Output() playing = new EventEmitter();
  @Output() pause = new EventEmitter();
  @Output() share = new EventEmitter<Audio>();

  constructor() {}
}
