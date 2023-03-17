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
  url: string;
  title: string;
  private _selectedAudio?: Audio;

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

    combineLatest([this.vm$, this._activatedRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (!res[0].isLoading) {
          this.url = res[1]['url'];
          this.title = res[1]['title'];
          this._selectedAudio = res[0].data.find((v) => v.url === res[1]['url']);
        }
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
    if (this._selectedAudio) this._store.load(this._selectedAudio);
    this._store.patchState({ isPlaying: true });
  }

  onPause() {
    this._store.patchState({ isPlaying: false });
    this._store.stop();
  }
}
