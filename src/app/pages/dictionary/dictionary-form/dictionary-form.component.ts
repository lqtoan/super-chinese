import { DictionaryStore } from './../dictionary.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
})
export class DictionaryFormComponent implements OnInit {
  constructor(private readonly store: DictionaryStore) {}

  readonly isVisibleForm$ = this.store.isVisibleForm$;

  ngOnInit(): void {}

  onClose() {
    this.store.setShowForm(false);
    // this.courseForm.get('name')?.reset();
    // this.store.setFormValue(undefined);
  }
}
