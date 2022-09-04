import { Component, Input } from '@angular/core';
import { Vocabulary } from '@models/vocabulary.model';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent {
  @Input() vocabularyList: Vocabulary[] = [];
}
