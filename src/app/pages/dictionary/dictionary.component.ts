import { Notification } from '@models/notification.model';
import { NotificationStore } from '../../core/state/notification.store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DictionaryService } from '@services/dictionary.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, zh_CN, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LanguageService } from 'src/app/core/layout/change-language/language.service';
import { UserProfileStore } from '../../core/state/user-profile.store';
import { DictionaryStore } from './dictionary.store';
import { Word } from '@models/word.model';
import { RealtimeService } from 'src/app/core/realtime/realtime.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  providers: [NzMessageService, DictionaryStore, UserProfileStore, DictionaryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements OnInit, OnDestroy {
  readonly vm$ = this._store.vm$;
  keyword: string = '';
  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly _store: DictionaryStore,
    private readonly _userStore: UserProfileStore,
    private readonly _modal: NzModalService,
    private readonly _languageService: LanguageService,
    private readonly _i18n: NzI18nService,
    private readonly _translateService: TranslateService,
    private readonly _messageService: NzMessageService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _realtimeService: RealtimeService,
    private readonly _notificationStore: NotificationStore
  ) {}

  ngOnInit(): void {
    this._userStore.loadData();

    this._activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res['ref']) {
        this.onSearch(res['ref']);
        this._store.patchState({ filterType: 'search' });
      } else {
        this.onViewLatest();
        this._store.patchState({ filterType: 'latest' });
      }
    });

    this._languageService.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      switch (res) {
        case 'en':
          this._i18n.setLocale(en_US);
          break;
        case 'zh':
          this._i18n.setLocale(zh_CN);
          break;
        case 'vi':
          this._i18n.setLocale(vi_VN);
          break;
      }
    });

    this._realtimeService
      .listenToTheSocket('new-word')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Word) => {
        console.log('Websocket connected!');

        this._store.updateWords(res);
        setTimeout(() => {
          document.querySelector('.list')?.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
      });

    this._realtimeService
      .listenToTheSocket('update-word')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: { old: Word; new: Word }) => {
        console.log('Websocket connected!');

        this._store.updateWords(res.new);
      });

    this._realtimeService
      .listenToTheSocket('delete-word')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Word) => {
        console.log('Websocket connected!');

        this._store.deleteWord(res);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreate() {
    this._store.patchState({ isCreate: true, isVisible: true });
  }

  onSearch(keyword: string) {
    if (keyword) {
      this._store.loadSearchResults(keyword);
      this.keyword = keyword;
      this._router.navigate([], { queryParams: { ref: keyword } });
    } else {
      this.onViewLatest();
      this._router.navigate([]);
    }
  }

  onViewLatest() {
    this.keyword = '';
    this._router.navigate([]);
    this._store.loadLatestWords();
  }

  showConfirm(): void {
    this._modal.confirm({
      nzTitle: this._translateService.instant('MODAL.CONFIRM_VIEW_ALL'),
      nzContent: this._translateService.instant('MODAL.CONFIRM_VIEW_ALL.CONTENT'),
      nzOkText: this._translateService.instant('CONFIRM_VIEW_ALL'),
      nzOnOk: () => {
        this.onViewAll();
      },
    });
  }

  onViewAll() {
    this.keyword = '';
    this._router.navigate([]);
    this._store.loadAllWords();
  }

  onEdit(word: Word) {
    this._store.loadWordById(word.wordId);
    this._userStore.getEmail() === 'lqtoan37@gmail.com' || this._userStore.getUserName() === word.createdBy
      ? this._store.patchState({ formValue: word, isVisible: true, isCreate: false })
      : this._messageService.error(this._translateService.instant('NOTIFICATION.UPDATE_DECLINE'));
  }

  onDelete(word: Word) {
    if (this._userStore.getEmail() === 'lqtoan37@gmail.com') {
      this._store.deleteWordEffect(word.wordId);
      let notification: Notification = {
        notificationId: '',
        createdDate: new Date(),
        createdBy: this._userStore.getUserName(),
        action: 'IS_DELETED_BY',
        content: `${word.display}[${word.pinyin}] `,
        extraContent: null,
        navigate: null,
        isRead: false,
      };
      this._notificationStore.createNotificationEffect(notification);
    } else this._messageService.error(this._translateService.instant('NOTIFICATION.DELETE_DECLINE'));
  }
}
