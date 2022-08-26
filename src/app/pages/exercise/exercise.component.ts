import { Audio } from '../../core/models/audio';
import { AudioService } from '../../core/services/audio/audio.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseComponent implements OnInit {
  audioList: Audio[] = [];
  currentPage: number = 1;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getExerciseAudioList().subscribe((res) => (this.audioList = res));
  }
}
