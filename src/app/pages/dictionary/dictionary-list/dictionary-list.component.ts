import { TableHeader } from 'src/app/shared/table/models/index';
import { Dictionary } from '@models/dictionary.model';
import { DictionaryStore } from './../dictionary.store';
import { UserProfileStore } from './../../user-profile/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  providers: [DictionaryStore, UserProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DictionaryListComponent implements OnInit {
  constructor(private readonly store: DictionaryStore, private readonly userStore: UserProfileStore) {}

  private readonly sortPinyin = (a: Dictionary, b: Dictionary) => a.pinyin.localeCompare(b.pinyin);
  private readonly sortHsk = (a: Dictionary, b: Dictionary) => a.hsk.localeCompare(b.hsk);
  private readonly sortCreatedDate = (a: Dictionary, b: Dictionary) =>
    a.createdDate.toString().localeCompare(b.createdDate.toString());
  private readonly filterHsk = (list: string[], item: Dictionary) => list.some((name) => item.hsk.indexOf(name) !== -1);
  private readonly initHskFilter = [
    { text: 'HSK 1', value: 'hsk1', byDefault: false },
    { text: 'HSK 2', value: 'hsk2', byDefault: false },
    { text: 'HSK 3', value: 'hsk3', byDefault: false },
    { text: 'HSK 4', value: 'hsk4', byDefault: false },
    { text: 'HSK 5', value: 'hsk5', byDefault: false },
    { text: 'HSK 6', value: 'hsk6', byDefault: false },
    { text: 'HSK 7-9', value: 'hsk79', byDefault: false },
    { text: '-------', value: 'z---', byDefault: false },
  ];

  private readonly headers: TableHeader<Dictionary>[] = [
    { label: 'DICTIONARY.DISPLAY', field: 'display', cellType: 'display', width: '4.25rem', position: 'left' },
    {
      label: 'DICTIONARY.PINYIN',
      field: 'pinyin',
      cellType: 'lowercase',
      width: '7rem',
      sortOrder: null,
      sortFn: this.sortPinyin,
      sortPriority: false,
    },
    {
      label: 'DICTIONARY.CHINA_VIETNAM_WORD',
      field: 'chinaVietnamWord',
      cellType: 'titlecase',
      width: '8rem',
      // sortOrder: 'ascend',
      // sortFn: this.sortChinaVietnamWord,
      // sortPriority: false,
    },
    { label: 'DICTIONARY.DEFINE', field: 'define', width: '16rem' },
    {
      label: 'HSK',
      field: 'hsk',
      cellType: 'hsk',
      width: '5rem',
      align: 'center',
      sortOrder: null,
      sortFn: this.sortHsk,
      sortPriority: false,
      filters: this.initHskFilter,
      filterFn: this.filterHsk,
    },
    {
      label: 'CREATED',
      field: 'createdDate',
      cellType: 'date',
      width: '10rem',
      sortOrder: null,
      sortFn: this.sortCreatedDate,
      sortPriority: false,
    },
    {
      label: 'UPDATED',
      field: 'updatedDate',
      cellType: 'date',
      width: '10rem',
    },
    { label: 'CREATED_BY', field: 'createdBy', cellType: 'ellipsis', width: '5.75rem' },
    {
      label: '',
      cellType: 'actions',
      width: '2rem',
      field: '_id',
    },
  ];

  readonly vm$ = this.store.vm$;
  private email: string = '';
  ngOnInit(): void {
    this.store.setHeaders(this.headers);
    this.store.loadData();
    this.userStore.loadData();
  }

  onCreate() {
    this.store.setIsCreate(true);
    this.store.setShowForm(true);
  }

  onEdit(id: string) {
    this.email = this.userStore.getEmail();
    if (this.email === 'lqtoan37@gmail.com') {
      this.store.getDictionaryById(id);
    }
  }

  onDelete(id: string) {
    this.store.deleteDictionary(id);
  }

  onCancel() {}
}
