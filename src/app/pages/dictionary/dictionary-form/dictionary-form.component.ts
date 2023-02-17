import { UserProfileStore } from './../../user-profile/user-profile.store';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from '@models/word.model';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DictionaryFormComponent implements OnInit {
  constructor(
    private readonly _store: DictionaryStore,
    private readonly _formBuilder: FormBuilder,
    private readonly _userStore: UserProfileStore
  ) {}
  readonly isVisibleForm$ = this._store.isVisibleForm$;
  readonly isCreate$ = this._store.isCreate$;

  readonly dictionaryForm: FormGroup = this._formBuilder.group({
    _id: [],
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    chinaVietnamWord: ['', Validators.compose([])],
    define: ['', Validators.compose([Validators.required])],
    hsk: ['', Validators.compose([Validators.required])],
    createdDate: ['', Validators.compose([])],
    updatedDate: ['', Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });

  ngOnInit(): void {
    this._store.formValue$.subscribe((formValue) => {
      if (formValue) {
        this.setValue(formValue);
      }
    });
  }

  setValue(data: Partial<Word>) {
    this.dictionaryForm.patchValue({
      _id: data._id,
      display: data.display,
      pinyin: data.pinyin,
      chinaVietnamWord: data.chinaVietnamWord,
      define: data.define,
      hsk: data.hsk,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
    });
  }

  onClose() {
    this.onCancel();
  }

  onSubmit() {
    this.isEdit() ? this.edit() : this.create();
    this.dictionaryForm.reset();
  }

  isEdit(): boolean {
    const formValue = this.dictionaryForm.getRawValue();
    return formValue._id ? true : false;
  }

  create() {
    const formValue = this.dictionaryForm.getRawValue();
    formValue.createdDate = new Date();
    formValue.createdBy = this._userStore.getUserName();
    this._store.createWord(formValue);
  }

  edit() {
    const formValue = this.dictionaryForm.getRawValue();
    formValue.updatedDate = new Date();
    this._store.updateWord(formValue);
  }

  onCancel() {
    this._store.setShowForm(false);
    this.dictionaryForm.reset();
    this._store.setFormValue(undefined);
  }
}
