import { AudioService } from '@services/audio.service';
import { AudioConfiguration } from '@models/audio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent implements OnInit {
  hsk1Audio: AudioConfiguration = {
    list: [],
    height: '7rem'
  }
  currentPage: number = 1;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getHsk1CurriculumAudioList().subscribe((res) => (this.hsk1Audio.list = res));
    console.log('on init', this.hsk1Audio);
  }
}
