import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil, zip } from 'rxjs';
import { Audio } from '@models/audio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioType } from '@enums/audio-type.enum';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListeningStore],
})
export class ListeningComponent implements OnInit, OnDestroy {
  readonly vm$ = this._store.vm$;
  readonly destroy$ = new Subject<void>();

  private _type: AudioType = 'CURRICULUM';
  tabIndex: number = 0;
  currentPage: number = 1;
  url: string;
  title: string;
  private _selectedAudio?: Audio;

  constructor(
    private readonly _store: ListeningStore,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.currentPage = res['page'];
      if (res['tab'] !== this.tabIndex || res['type'] !== this._type) {
        this._store.loadData([res['tab'] ? parseInt(res['tab']) : 0, res['type']]);
        this._type = res['type'];
        this.tabIndex = res['tab'];
      }
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
    this._router.navigate([], {
      queryParams: {
        tab: tabIndex,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(pageIndex: number) {
    this._router.navigate([], {
      queryParams: {
        page: pageIndex,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSelectAudio(audio: Audio) {
    this._store.selectAudio(audio);
    this._router.navigate([], {
      queryParams: {
        url: audio.url,
        title: audio.title,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPlaying() {
    if (this._selectedAudio) this._store.load(this._selectedAudio);
    this._store.patchState({ isPlaying: true });
  }

  onPause() {
    this._store.patchState({ isPlaying: false });
  }
}
