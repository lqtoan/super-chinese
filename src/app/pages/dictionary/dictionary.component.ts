import { Subject, takeUntil } from 'rxjs';
import { DictionaryService } from '@services/dictionary.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, zh_CN, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LanguageService } from 'src/app/core/layout/change-language/language.service';
import { UserProfileStore } from '../user-profile/user-profile.store';
import { DictionaryStore } from './dictionary.store';
import { Word } from '@models/word.model';

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
    private readonly _messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this._userStore.loadData();

    this._store.patchState({ filterType: 'latest' });
    this.onView8Latest();

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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreate() {
    this._store.patchState({ isCreate: true, isVisible: true });
  }

  onSearch(keyword: string) {
    keyword ? this._store.loadSearchResults(keyword) : this._store.loadLatestWords();
  }

  onView8Latest() {
    this.keyword = '';
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
    this._store.loadAllWords();
  }

  onEdit(word: Word) {
    this._userStore.getEmail() === 'lqtoan37@gmail.com' 
    ? this._store.patchState({ formValue: word, isVisible: true, isCreate: false })
    : this._messageService.error(this._translateService.instant('NOTIFICATION.UPDATE_DECLINE'));
  }

  onDelete(id: string) {
    this._userStore.getEmail() === 'lqtoan37@gmail.com' 
    ? this._store.deleteWord(id) 
    : this._messageService.error(this._translateService.instant('NOTIFICATION.DELETE_DECLINE'));
  }
}
