import { DictionaryStore } from './../dictionary.store';
import { UserProfileStore } from './../../user-profile/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
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
  readonly words$ = this.store.words$;

  constructor(private readonly store: DictionaryStore) {}

  ngOnInit(): void {
    // this.store.loadData();
  }

  onCreate() {
    this.store.setIsCreate(true);
    this.store.setShowForm(true);
  }

  onSearch(keyword: string) {
    this.store.setKeyword(keyword);
    keyword ? this.store.loadSearchResults(keyword) : null;
  }

  onSpeak(text: string) {
    this.store.speak(text);
  }

  onScrollToIndex(index: number) {
    this.store.scrollToIndex(index);
  }
}
