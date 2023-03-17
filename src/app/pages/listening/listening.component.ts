import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil, zip } from 'rxjs';
import { Audio } from '@models/audio.model';
import { Router, ActivatedRoute } from '@angular/router';

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
  currentPage: number;

  constructor(
    private readonly _store: ListeningStore,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.tabIndex$, this.typeIndex$])
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this._store.loadData([res[0], res[1]]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectTab(tabIndex: number) {
    this._store.setTabIndex(tabIndex);
    this._router.navigate([], {
      queryParams: {
        page: 1,
      },
    });
  }

  onSelectAudio(audio: Audio) {
    this._store.selectAudio(audio);
    this._router.navigate([], {
      queryParams: {
        page: this.currentPage,
        url: audio.url,
        title: audio.title,
      },
    });
  }

  onPageChange(pageIndex: number) {
    this._router.navigate([], {
      queryParams: {
        page: pageIndex,
      },
    });
  }

  onPlaying() {
    this._store.patchState({ isPlaying: true });
  }

  onPause() {
    this._store.patchState({ isPlaying: false });
  }
}
