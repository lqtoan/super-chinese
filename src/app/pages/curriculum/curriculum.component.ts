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

  selectedAudio?: Audio;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getCurriculumAudioList().subscribe((as) => (this.audioList = as));
  }

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }
}
