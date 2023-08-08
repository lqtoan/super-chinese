import { Word } from '@models/word.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.scss'],
})
export class DictionaryItemComponent {
  @Input() word: Word;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onCancel() {}
}
