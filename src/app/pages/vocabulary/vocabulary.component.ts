import { VocabularyStore } from './vocabulary.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VocabularyStore],
  // encapsulation: ViewEncapsulation.None,
})
export class VocabularyComponent implements OnInit {
  constructor(private readonly store: VocabularyStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.loadHsk1();
    this.store.loadHsk2();
  }
}
