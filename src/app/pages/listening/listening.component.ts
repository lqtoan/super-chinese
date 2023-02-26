import { ListeningStore } from './listening.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListeningStore],
})
export class ListeningComponent implements OnInit {
  readonly vm$ = this._store.vm$;
  readonly tabIndex$ = this._store.tabIndex$;
  readonly typeIndex$ = this._store.typeIndex$;

  constructor(private readonly _store: ListeningStore) {}

  ngOnInit(): void {
    combineLatest([this.tabIndex$, this.typeIndex$]).subscribe(res => {
      this._store.loadData([res[0], res[1]])
    })
  }

  onSelectTab(tabIndex: number) {
    this._store.setTabIndex(tabIndex);
  }
}
