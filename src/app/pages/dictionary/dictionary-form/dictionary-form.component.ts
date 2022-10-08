import { Dictionary } from '@models/dictionary.model';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService, vi_VN, zh_CN } from 'ng-zorro-antd/i18n';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryFormComponent implements OnInit {
  constructor(private readonly store: DictionaryStore, private readonly formBuilder: FormBuilder) {}
  readonly destroy$ = new Subject<void>();
  readonly isVisibleForm$ = this.store.isVisibleForm$;
  readonly isCreate$ = this.store.isCreate$;
  readonly formValue$ = this.store.formValue$;

  private readonly initDate: Date = new Date();

  readonly dictionaryForm: FormGroup = this.formBuilder.group({
    _id: [],
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    chinaVietnamWord: ['', Validators.compose([Validators.required])],
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
      createdBy: data.createdBy,
    });
  }

  onClose() {
    this.store.setShowForm(false);
    this.dictionaryForm.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    let formValue = this.dictionaryForm.getRawValue();
    if (formValue._id) {
      formValue.updatedDate = new Date();
      this.store.updateDictionary(formValue);
      this.dictionaryForm.reset();
    } else {
      formValue.createdDate = new Date();
      // TODO: createdBy
      this.store.createDictionary(formValue);
      this.dictionaryForm.reset();
    }
  }
}
