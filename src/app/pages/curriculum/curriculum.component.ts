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
  readonly destroy$ = new Subject<void>();

  constructor(private readonly store: CurriculumStore) {}

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
