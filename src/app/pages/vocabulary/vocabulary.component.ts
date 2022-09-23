import { Vocabulary } from '@models/vocabulary.model';
import { VocabularyService } from '@services/vocabulary.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabularyComponent implements OnInit {
  constructor(private readonly vocabularyService: VocabularyService) {}

  isLoading = true;
  // hsk1Vocabulary$ = this.vocabularyService.hsk1Vocabulary$;
  hsk1Vocabulary: Vocabulary[] = [];
  hsk2Vocabulary: Vocabulary[] = [];

  ngOnInit(): void {
    this.vocabularyService.getHsk1Vocabulary().subscribe((res) => {
      (this.hsk1Vocabulary = res), (this.isLoading = false);
    });
    this.vocabularyService.getHsk2Vocabulary().subscribe((res) => {
      (this.hsk2Vocabulary = res), (this.isLoading = false);
    });
  }
}
