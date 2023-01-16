import { Word } from '@models/word.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DictionaryStore } from '../dictionary.store';

@Component({
  selector: 'app-dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryItemComponent implements OnInit {
  @Input() word: Word = {
    _id: '',
    display: '',
    define: '',
    pinyin: '',
    hsk: '',
    chinaVietnamWord: '',
    createdDate: new Date(),
    createdBy: '',
    updatedDate: new Date(),
  };

  constructor(private readonly store: DictionaryStore) {}

  ngOnInit(): void {}

  onEdit(id: string) {
    // if (this.userStore.getEmail() === 'lqtoan37@gmail.com') {
    this.store.loadWordById(id);
    // } else {
    //   this.message.error(this.translateService.instant('NOTIFICATION.UPDATE_DECLINE'));
    // }
  }

  onDelete(id: string) {
    // if (this.userStore.getEmail() === 'lqtoan37@gmail.com') {
    this.store.deleteWord(id);
    // } else {
    //   this.message.error(this.translateService.instant('NOTIFICATION.DELETE_DECLINE'));
    // }
  }

  onCancel() {}
}
