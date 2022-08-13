import { Vocabulary } from './../../core/models/vocabulary';
import { VocabularyService } from './../../core/services/vocabulary/vocabulary.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  hsk1Vocabulary: Vocabulary[] = [];
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit(): void {
    this.vocabularyService.getHsk1Vocabulary().subscribe((res) => (this.hsk1Vocabulary = res));
  }
}
