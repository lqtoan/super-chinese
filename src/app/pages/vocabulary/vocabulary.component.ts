import { VocabularyService } from '@services/vocabulary.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabularyComponent implements OnInit {
  constructor(private vocabularyService: VocabularyService) {}

  hsk1Vocabulary$ = this.vocabularyService.hsk1Vocabulary$;

  ngOnInit(): void {
    this.hsk1Vocabulary$.pipe().subscribe();

    this.getHsk1Vocabulary();
  }

  getHsk1Vocabulary() {
    this.vocabularyService.getHsk1Vocabulary().subscribe();
  }
}
