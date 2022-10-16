import { UserProfileStore } from './../../user-profile/user-profile.store';
import { Dictionary } from '@models/dictionary.model';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DictionaryFormComponent implements OnInit {
  constructor(
    private readonly store: DictionaryStore,
    private readonly formBuilder: FormBuilder,
    private readonly userStore: UserProfileStore
  ) {}
  readonly destroy$ = new Subject<void>();
  readonly isVisibleForm$ = this.store.isVisibleForm$;
  readonly isCreate$ = this.store.isCreate$;
  readonly formValue$ = this.store.formValue$;

  private readonly initDate: Date = new Date();

  readonly dictionaryForm: FormGroup = this.formBuilder.group({
    _id: [],
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    chinaVietnamWord: ['', Validators.compose([])],
    define: ['', Validators.compose([Validators.required])],
    hsk: ['', Validators.compose([Validators.required])],
    createdDate: [this.initDate, Validators.compose([])],
    updatedDate: ['', Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });

  ngOnInit(): void {
    this.store.formValue$.pipe(takeUntil(this.destroy$)).subscribe((formValue) => {
      if (formValue) {
        this.setValue(formValue);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setValue(data: Partial<Dictionary>) {
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
    let formValue = this.dictionaryForm.getRawValue();
    return formValue._id ? true : false;
  }

  create() {
    let formValue = this.dictionaryForm.getRawValue();
    formValue.createdDate = new Date();
    formValue.createdBy = this.userStore.getUserName();
    this.store.createDictionary(formValue);
  }

  edit() {
    let formValue = this.dictionaryForm.getRawValue();
    formValue.updatedDate = new Date();
    this.store.updateDictionary(formValue);
  }

  onCancel() {
    this.store.setShowForm(false);
    this.dictionaryForm.reset();
    this.store.setFormValue(undefined);
  }
}
