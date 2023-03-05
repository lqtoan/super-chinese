import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListeningStore],
})
export class ListeningComponent implements OnInit, OnDestroy {
  readonly vm$ = this._store.vm$;
  readonly tabIndex$ = this._store.tabIndex$;
  readonly typeIndex$ = this._store.typeIndex$;
  readonly destroy$ = new Subject<void>();

  constructor(private readonly _store: ListeningStore) {}

  ngOnInit(): void {
    combineLatest([this.tabIndex$, this.typeIndex$]).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this._store.loadData([res[0], res[1]])
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectTab(tabIndex: number) {
    this._store.setTabIndex(tabIndex);
  }
}
