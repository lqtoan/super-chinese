import { TableHeader } from 'src/app/shared/table/models/table-header.model';
import { Dictionary } from '@models/dictionary.model';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  providers: [DictionaryStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit {
  constructor(private readonly store: DictionaryStore) {}
  private readonly sortPinyin = (a: Dictionary, b: Dictionary) => a.pinyin.localeCompare(b.pinyin);
  private readonly sortHsk = (a: Dictionary, b: Dictionary) => a.hsk.localeCompare(b.hsk);
  private readonly filterHsk = (list: string[], item: Dictionary) => list.some((name) => item.hsk.indexOf(name) !== -1);
  private readonly initHskFilter = [
    { text: 'HSK 1', value: 'hsk1', byDefault: false },
    { text: 'HSK 2', value: 'hsk2', byDefault: false },
    { text: 'HSK 3', value: 'hsk3', byDefault: false },
  ];

  private readonly headers: TableHeader<Dictionary>[] = [
    { label: 'DICTIONARY.DISPLAY', field: 'display', width: '5rem', position: 'left' },
    {
      label: 'DICTIONARY.PINYIN',
      field: 'pinyin',
      width: '8rem',
      sortOrder: 'ascend',
      sortFn: this.sortPinyin,
      sortPriority: 1,
    },
    { label: 'DICTIONARY.DEFINE', field: 'define', width: '12rem' },
    {
      label: 'HSK',
      field: 'hsk',
      width: '5rem',
      sortOrder: 'ascend',
      sortFn: this.sortHsk,
      sortPriority: 2,
      filters: this.initHskFilter,
      filterFn: this.filterHsk,
    },
    { label: 'CREATED', field: 'createdDate', width: '200px' },
    { label: 'UPDATED', field: 'updatedDate', width: '200px' },
    { label: 'CREATED_BY', field: 'createdBy', width: '200px' },
  ];

  readonly vm$ = this.store.vm$;
  ngOnInit(): void {
    this.store.loadData();
  }

  onShowForm() {
    this.store.setShowForm(true);
  }

  onDelete(id: string) {
    this.store.deleteDictionary(id);
  }
}
