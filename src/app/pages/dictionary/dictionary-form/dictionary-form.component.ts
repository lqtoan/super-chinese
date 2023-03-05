import { UserProfileStore } from './../../user-profile/user-profile.store';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from '@models/word.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DictionaryFormComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _store: DictionaryStore,
    private readonly _formBuilder: FormBuilder,
    private readonly _userStore: UserProfileStore
  ) {}
  readonly isVisibleForm$ = this._store.isVisibleForm$;
  readonly isCreate$ = this._store.isCreate$;
  readonly requestStatus$ = this._store.requestStatus$;

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
  shouldStay: boolean = true;
  canEdit: boolean = false;

  readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this._store.formValue$.pipe(takeUntil(this.destroy$)).subscribe((formValue) => {
      if (formValue) {
        this.setValue(formValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  onSubmit() {
    if(!this.dictionaryForm.invalid) {
      if(this.isEdit()) {
        this.edit();
      } else {
        this.create();
        this.dictionaryForm.reset();
      } 
    }
    this.shouldStay = true;
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
    this._store.patchState({ isVisibleForm: this.shouldStay });
  }

  edit() {
    const formValue = this.dictionaryForm.getRawValue();
    formValue.updatedDate = new Date();
    this._store.updateWord(formValue);
    this._store.patchState({ isVisibleForm: this.shouldStay });
  }

  onCancel() {
    this.dictionaryForm.reset();
    this._store.patchState({ isVisibleForm: false, formValue: undefined });
    this.shouldStay = true;
  }
}
