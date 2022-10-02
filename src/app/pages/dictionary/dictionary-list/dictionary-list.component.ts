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
  private readonly filterDisplay = (list: string[], item: Dictionary) =>
    list.some((name) => item.display.indexOf(name) !== -1);

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

  onSortChange() {}
}
