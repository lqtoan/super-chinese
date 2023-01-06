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
  readonly vm$ = this.store.vm$;
  currentFilter: string = '';
  confirmModal?: NzModalRef; // For testing by now

  constructor(
    private readonly store: DictionaryStore,
    private readonly modal: NzModalService,
    private readonly languageService: LanguageService,
    private readonly i18n: NzI18nService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.onView8Latest();

    this.languageService.currentLanguage$.subscribe((res) => {
      switch (res) {
        case 'en':
          this.i18n.setLocale(en_US);
          break;
        case 'zh':
          this.i18n.setLocale(zh_CN);
          break;
        case 'vi':
          this.i18n.setLocale(vi_VN);
          break;
      }
    });

    this.store.filterType$.subscribe((res) => {
      switch (res) {
        case 'all':
          this.onViewAll();
          break;
        case 'search':
          this.currentFilter = this.translateService.instant('SEARCH_RESULTS');
          break;
        default:
          break;
      }
    });
  }

  onCreate() {
    this.store.setIsCreate(true);
    this.store.setShowForm(true);
  }

  onSearch(keyword: string) {
    if (keyword) {
      this.store.setRequestStatus(null);
      this.store.setKeyword(keyword);
      this.store.setFilterType('search');
      this.store.loadSearchResults(keyword);
    }
  }

  onView8Latest() {
    this.currentFilter = this.translateService.instant('LATEST');
    this.store.setRequestStatus(null);
    this.store.setKeyword('');
    this.store.setFilterType('latest');
    this.store.loadLatestWords();
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.translateService.instant('MODAL.CONFIRM_VIEW_ALL'),
      nzContent: this.translateService.instant('MODAL.CONFIRM_VIEW_ALL.CONTENT'),
      nzOkText: this.translateService.instant('CONFIRM_VIEW_ALL'),
      nzOnOk: () => {
        this.onViewAll();
      },
    });
  }

  onViewAll() {
    this.currentFilter = this.translateService.instant('VIEW_ALL');
    this.store.setRequestStatus(null);
    this.store.setKeyword('');
    this.store.setFilterType('all');
    this.store.loadAllWords();
  }
}
