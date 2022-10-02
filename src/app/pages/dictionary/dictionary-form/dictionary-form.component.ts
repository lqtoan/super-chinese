import { DictionaryStore } from './../dictionary.store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
})
export class DictionaryFormComponent implements OnInit {
  constructor(private readonly store: DictionaryStore, private readonly formBuilder: FormBuilder) {}

  readonly dictionaryForm: FormGroup = this.formBuilder.group({
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    define: ['', Validators.compose([Validators.required])],
    createdDate: ['', Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });

  readonly isVisibleForm$ = this.store.isVisibleForm$;

  ngOnInit(): void {}

  onClose() {
    this.store.setShowForm(false);
    this.dictionaryForm.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    let formValue = this.dictionaryForm.getRawValue();
    formValue.createdDate = new Date();
    this.store.createDictionary(formValue);
  }
}
