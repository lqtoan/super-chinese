import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil, zip } from 'rxjs';
import { Audio } from '@models/audio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioType } from '@enums/audio-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListeningStore, NzMessageService],
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
    private readonly _translateService: TranslateService,
    private readonly _messageService: NzMessageService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.vm$, this._activatedRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.currentPage = res[1]['page'];
        // Don't re-load if type or tab no change
        if (res[1]['tab'] !== this.tabIndex || res[1]['type'] !== this._type) {
          this._store.loadData([res[1]['tab'] ? parseInt(res[1]['tab']) : 0, res[1]['type']]);
          this._type = res[1]['type'];
          this.tabIndex = res[1]['tab'];
        }
        if (!res[0].isLoading) {
          this.url = res[1]['url'];
          this.title = res[1]['title'];
          this._selectedAudio = res[0].data.find((v) => v.url === res[1]['url']);
        }
        if (document.querySelector('.audio--selected')) {
          document.querySelector('.audio--selected')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        } else {
          setTimeout(() => {
            document.querySelector('.audio--selected')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
          }, 400);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectTab(tabIndex: number) {
    // Change tab reset page, current audio
    this._router.navigate([], {
      queryParams: {
        tab: tabIndex,
        page: 1,
        title: null,
        url: null,
      },
      // Merge current type
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(pageIndex: number) {
    // Change page not reset current audio
    this._router.navigate([], {
      queryParams: {
        page: pageIndex,
      },
      // Merge current type, tab, current audio
      queryParamsHandling: 'merge',
    });
  }

  onSelectAudio(audio: Audio) {
    this._router.navigate([], {
      queryParams: {
        url: audio.url,
        title: audio.title,
      },
      // Merge current type, tab, page
      queryParamsHandling: 'merge',
    });
  }

  onPlayAudio(audio: Audio) {
    this._store.playAudio(audio);
    this._router.navigate([], {
      queryParams: {
        url: audio.url,
        title: audio.title,
      },
      // Merge current type, tab, page
      queryParamsHandling: 'merge',
    });
  }

  onPlaying() {
    if (this._selectedAudio) this._store.loadAudio(this._selectedAudio);
    this._store.patchState({ isPlaying: true });
  }

  onPauseAudio() {
    this._store.stopAudio();
  }

  onPause() {
    this._store.patchState({ isPlaying: false });
  }

  onShare(audio: Audio) {
    let url = `${window.location.host}/listening?type=${this._type}&tab=${this.tabIndex}&page=${this.currentPage}&title=${audio.title}&url=${audio.url}`;
    navigator.clipboard.writeText(url);
    this._messageService.success(this._translateService.instant('NOTIFICATION.COPIED'));
  }
}
