import { ExerciseStore } from './exercise.store';
import { AudioService } from '@services/audio.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExerciseStore],
})
export class ExerciseComponent implements OnInit {
  readonly vm$ = this.store.vm$;
  readonly destroy$ = new Subject<void>();

  constructor(private readonly store: ExerciseStore, private readonly audioService: AudioService) {}

  ngOnInit(): void {
    this.store.tabIndex$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.store.loadData(res);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectTab(tabIndex: number) {
    this.store.setTabIndex(tabIndex);
  }
}
