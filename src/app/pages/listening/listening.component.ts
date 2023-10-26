import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
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
  selectedAudio?: Audio;

  tabIndex: number = 0;
  currentPage: number = 1;

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
      .subscribe(([vm, queryParams]) => {
        this.currentPage = queryParams['page'];
        // Don't re-load if type or tab no change
        if (queryParams['tab'] !== this.tabIndex || queryParams['type'] !== this._type) {
          this._store.loadData([queryParams['tab'] ? parseInt(queryParams['tab']) : 0, queryParams['type']]);
          this._type = queryParams['type'];
          this.tabIndex = queryParams['tab'];
        }
        if (!vm.isLoading) {
          this.selectedAudio = vm.data.find((v) => v.url === queryParams['url']);
        }
        setTimeout(() => {
          document.querySelector('.audio--selected')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 0);
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
    if (pageIndex > this.currentPage)
      setTimeout(() => {
        document.querySelectorAll('.audio')[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 0);
    else
      setTimeout(() => {
        document
          .querySelectorAll('.audio')
          [document.querySelectorAll('.audio').length - 1].scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 0);
  }

  onSelectAudio(audio: Audio) {
    this.selectedAudio = audio;
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
    if (this.selectedAudio) this._store.loadAudio(this.selectedAudio);
    this._store.patchState({ isPlaying: true });
  }

  onPauseAudio() {
    this._store.stopAudio();
  }

  onShare(audio: Audio) {
    let url = `${window.location.host}/listening?type=${this._type}&tab=${this.tabIndex}&page=${this.currentPage}&title=${audio.title}&url=${audio.url}`;
    navigator.clipboard.writeText(url);
    this._messageService.success(this._translateService.instant('NOTIFICATION.COPIED'));
  }
}
