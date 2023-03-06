import { FilterType } from '@enums/dictionary.enum';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
})
export class DictionaryListComponent {
  @Input() isLoading: boolean;
  @Input() words: boolean;
  @Input() filterType: FilterType;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
