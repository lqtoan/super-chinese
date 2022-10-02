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

  ngOnInit(): void {}

  onShowForm() {
    this.store.setShowForm(true);
  }
}
