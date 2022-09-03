import { AudioService } from '@services/audio/audio.service';
import { AudioConfiguration } from '@models/audio';
import { ChangeDetectionStrategy, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent implements OnInit {
  // hsk1AudioList: Audio[] = [];
  hsk1Audio: AudioConfiguration = {
    list: [],
    height: '7rem'
  }

  currentPage: number = 1;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getHsk1CurriculumAudioList().subscribe((res) => (this.hsk1Audio.list = res));
  }
}
