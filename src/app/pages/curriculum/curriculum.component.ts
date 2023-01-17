import { AudioService } from '@services/audio.service';
import { AudioConfiguration } from '@models/audio.model';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent implements OnInit, OnDestroy {
  readonly tabIndex$ = this.audioService.currentTab$;
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
  hsk3Audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };
  readonly destroy$ = new Subject<void>();

  constructor(private readonly audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.currentTab$.pipe(takeUntil(this.destroy$)).subscribe((tabIndex) => {
      switch (tabIndex) {
        case 0:
          this.audioService.getHsk1CurriculumAudioList().subscribe((res) => {
            this.hsk1Audio.list = res;
            this.hsk1Audio.list.forEach((audio) => {
              audio.type = 'CURRICULUM';
              audio.grade = 'hsk 1';
            });
            this.hsk1Audio.isLoading = false;
          });
          break;
        case 1:
          this.audioService.getHsk2CurriculumAudioList().subscribe((res) => {
            this.hsk2Audio.list = res;
            this.hsk2Audio.list.forEach((audio) => {
              audio.type = 'CURRICULUM';
              audio.grade = 'hsk 2';
            });
            this.hsk2Audio.isLoading = false;
          });
          break;
        case 2:
          this.audioService.getHsk3CurriculumAudioList().subscribe((res) => {
            this.hsk3Audio.list = res;
            this.hsk3Audio.list.forEach((audio) => {
              audio.type = 'CURRICULUM';
              audio.grade = 'hsk 3';
            });
            this.hsk3Audio.isLoading = false;
          });
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectTab(tabIndex: number) {
    this.audioService.changeTabIndex(tabIndex);
  }
}
