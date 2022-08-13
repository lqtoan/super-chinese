import { AudioService } from '../../core/services/audio/audio.service';
import { Audio } from '../../core/models/audio';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent implements OnInit {
  audioList: Audio[] = [];
  currentPage: number = 1;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getCurriculumAudioList().subscribe((res) => (this.audioList = res));
  }
}
