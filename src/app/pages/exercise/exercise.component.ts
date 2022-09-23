import { AudioConfiguration } from '@models/audio.model';
import { AudioService } from '@services/audio.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseComponent implements OnInit {
  // hsk1AudioList: Audio[] = [];
  hsk1Audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };
  hsk2Audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };

  constructor(private readonly audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getHsk1ExerciseAudioList().subscribe((res) => {
      (this.hsk1Audio.list = res), (this.hsk1Audio.isLoading = false);
    });
    this.audioService.getHsk2ExerciseAudioList().subscribe((res) => {
      (this.hsk2Audio.list = res), (this.hsk2Audio.isLoading = false);
    });
  }
}
