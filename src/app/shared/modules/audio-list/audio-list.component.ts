import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { Audio } from '@models/audio.model';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
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

  @Output() selectAudio = new EventEmitter<Audio>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() playing = new EventEmitter();
  @Output() pause = new EventEmitter();

  constructor() {}
}
