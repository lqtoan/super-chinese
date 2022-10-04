import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService, vi_VN, zh_CN } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrls: ['./dictionary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryFormComponent implements OnInit {
  constructor(
    private readonly store: DictionaryStore,
    private readonly formBuilder: FormBuilder,
    private readonly i18n: NzI18nService
  ) {}
  readonly destroy$ = new Subject<void>();
  readonly isVisibleForm$ = this.store.isVisibleForm$;

  private readonly currentLanguage = localStorage.getItem('language');
  private readonly initDate: Date = new Date();

  readonly dictionaryForm: FormGroup = this.formBuilder.group({
    _id: [],
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    define: ['', Validators.compose([Validators.required])],
    hsk: ['', Validators.compose([Validators.required])],
    createdDate: [this.initDate, Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });

  ngOnInit(): void {
    if (this.currentLanguage == 'vi') {
      this.i18n.setLocale(vi_VN);
    }
    if (this.currentLanguage == 'en') {
      this.i18n.setLocale(en_US);
    }
    if (this.currentLanguage == 'zh') {
      this.i18n.setLocale(zh_CN);
    }
  }

  onClose() {
    this.store.setShowForm(false);
    this.dictionaryForm.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    let formValue = this.dictionaryForm.getRawValue();
    formValue.createdDate = new Date();
    this.store.createDictionary(formValue);
    this.dictionaryForm.reset();
  }
}
