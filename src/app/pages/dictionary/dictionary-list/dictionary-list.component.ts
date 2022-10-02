import { TableHeader } from '@models/table.model';
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

  readonly headers: TableHeader = {
    labels: ['DICTIONARY.DISPLAY', 'DICTIONARY.PINYIN', 'DICTIONARY.DEFINE'],
    fields: ['display', 'pinyin', 'define'],
  };

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
