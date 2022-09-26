import { VocabularyStore } from './vocabulary.store';
import { Vocabulary } from '@models/vocabulary.model';
import { VocabularyService } from '@services/vocabulary.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VocabularyStore],
})
export class VocabularyComponent implements OnInit {
  constructor(private readonly store: VocabularyStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.loadHsk1();
    this.store.loadHsk2();
  }
}
