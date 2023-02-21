import { FilterType } from '@enums/dictionary.enum';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
