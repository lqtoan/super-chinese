import { FilterType } from '@enums/dictionary.enum';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../core/layout/change-language/language.service';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzI18nService, vi_VN, en_US, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent {
  @Input() isLoading: boolean;
  @Input() words: boolean;
  @Input() filterType: FilterType;
}
