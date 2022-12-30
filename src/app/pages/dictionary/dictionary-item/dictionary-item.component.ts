import { Word } from '@models/word.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DictionaryStore } from '../dictionary.store';
import { UserProfileStore } from '../../user-profile/user-profile.store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private readonly store: DictionaryStore,
    private readonly userStore: UserProfileStore,
    private readonly message: NzMessageService,
    private readonly translateService: TranslateService
  ) {}

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
