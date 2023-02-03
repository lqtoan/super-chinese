import { CurriculumStore } from './curriculum.store';
import { AudioService } from '@services/audio.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurriculumStore],
})
export class CurriculumComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$;
  readonly tabIndex$ = this.audioService.currentTab$;
  readonly destroy$ = new Subject<void>();

  constructor(private readonly store: CurriculumStore, private readonly audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.currentTab$.pipe(takeUntil(this.destroy$)).subscribe((tabIndex) => {
      switch (tabIndex) {
        case 0:
          this.store.loadHsk1();
          break;
        case 1:
          this.store.loadHsk2();
          break;
        case 2:
          this.store.loadHsk3();
          break;
        default:
          this.store.loadHsk1();
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
