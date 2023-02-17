import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../core/layout/change-language/language.service';
import { DictionaryStore } from './../dictionary.store';
import { UserProfileStore } from './../../user-profile/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzI18nService, vi_VN, en_US, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  providers: [NzMessageService, DictionaryStore, UserProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit {
  readonly vm$ = this._store.vm$;
  currentFilter: string = '';
  keyword: string = '';
  confirmModal?: NzModalRef; // For testing by now

  constructor(
    private readonly _store: DictionaryStore,
    private readonly _modal: NzModalService,
    private readonly _languageService: LanguageService,
    private readonly _i18n: NzI18nService,
    private readonly _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.onView8Latest();

    this._languageService.currentLanguage$.subscribe((res) => {
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

    this._store.filterType$.subscribe((res) => {
      switch (res) {
        case 'all':
          this.onViewAll();
          break;
        case 'search':
          this.currentFilter = this._translateService.instant('SEARCH_RESULTS');
          break;
        default:
          break;
      }
    });
  }

  onCreate() {
    this._store.setIsCreate(true);
    this._store.setShowForm(true);
  }

  onSearch(keyword: string) {
    if (keyword) {
      this._store.patchState({ keyword: keyword, requestStatus: null, filterType: 'search' });
      this._store.loadSearchResults(keyword);
    }
  }

  onView8Latest() {
    this.keyword = '';
    this.currentFilter = this._translateService.instant('LATEST');
    this._store.patchState({ keyword: '', requestStatus: null, filterType: 'latest' });
    this._store.loadLatestWords();
  }

  showConfirm(): void {
    this.confirmModal = this._modal.confirm({
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
    this.currentFilter = this._translateService.instant('VIEW_ALL');
    this._store.patchState({ keyword: '', requestStatus: null, filterType: 'all' });
    this._store.loadAllWords();
  }
}
