import { LanguageService } from './../../../core/layout/change-language/language.service';
import { DictionaryStore } from './../dictionary.store';
import { UserProfileStore } from './../../user-profile/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
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
  // readonly words$ = this.store.words$;
  currentFilter: string = '';
  confirmModal?: NzModalRef; // For testing by now

  constructor(
    private readonly store: DictionaryStore,
    private readonly modal: NzModalService,
    private readonly languageService: LanguageService,
    private readonly i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((val) => {
      switch (val) {
        case 'en':
          this.i18n.setLocale(en_US);
          break;
        case 'zh':
          this.i18n.setLocale(zh_CN);
          break;
        default:
          this.i18n.setLocale(vi_VN);
          break;
      }
    });

    this.store.filterType$.subscribe((val) => {
      switch (val) {
        case 'all':
          this.onViewAll();
          break;
        case 'search':
          this.currentFilter = 'Search results';
          break;
        default:
          break;
      }
    });
    this.onView8Latest();
  }

  onCreate() {
    this.store.setIsCreate(true);
    this.store.setShowForm(true);
  }

  onSearch(keyword: string) {
    this.store.setFilterType('search');
    this.store.setKeyword(keyword);
    keyword ? this.store.loadSearchResults(keyword) : null;
  }

  onView8Latest() {
    this.currentFilter = '8 latest words';
    this.store.setKeyword('');
    this.store.setFilterType('latest');
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to view all?',
      nzContent: 'View all can take many time to load data',
      nzOnOk: () => {
        this.onViewAll();
      },
    });
  }

  onViewAll() {
    this.currentFilter = 'View all';
    this.store.setKeyword('');
    this.store.setFilterType('all');
    this.store.loadData();
  }
}
