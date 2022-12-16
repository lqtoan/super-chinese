import { DictionaryStore } from './../dictionary.store';
import { UserProfileStore } from './../../user-profile/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  providers: [NzMessageService, DictionaryStore, UserProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit {
  readonly vm$ = this.store.vm$;

  constructor(private readonly store: DictionaryStore, private readonly userStore: UserProfileStore) {}

  ngOnInit(): void {
    this.store.loadData();
    this.userStore.loadData();
  }

  onCreate() {
    this.store.setIsCreate(true);
    this.store.setShowForm(true);
  }

  onSearch(event: any) {
    event.target.value ? this.store.loadSearchResults(event.target.value) : this.store.loadData();
  }

  onSpeak(text: string) {
    this.store.speak(text);
  }
}
