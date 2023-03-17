import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Audio } from '@models/audio.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Input() isPlaying: boolean = false;
  @Input() progress: any;

  @Output() selectAudio = new EventEmitter<Audio>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() playing = new EventEmitter();
  @Output() pause = new EventEmitter();

  constructor() {
    document.getElementById('audioControls')?.addEventListener('click', this.myFunction);
  }

  myFunction() {
    console.log('hello');
  }
}
