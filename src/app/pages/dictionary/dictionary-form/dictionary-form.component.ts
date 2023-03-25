import { UserProfileStore } from '../../../core/state/user-profile.store';
import { DictionaryStore } from './../dictionary.store';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from '@models/word.model';
import { skip, Subject, takeUntil } from 'rxjs';

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
    private readonly _userStore: UserProfileStore,
    private readonly _cdr: ChangeDetectorRef
  ) {}
  readonly formVm$ = this._store.formVm$;

  readonly dictionaryForm: FormGroup = this._formBuilder.group({
    wordId: [],
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
  private _currentWord: Partial<Word> | undefined;

  readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.formVm$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res.formValue) {
        if (res.formValue?.chinaVietnamWord === null || res.formValue?.chinaVietnamWord === '')
          res.formValue.chinaVietnamWord = undefined;
        this.setValue(res.formValue);
        this._currentWord = res.formValue;
      }
    });

    this.dictionaryForm.valueChanges
      .pipe(takeUntil(this.destroy$), skip(1))
      .subscribe((res: Partial<Word> | undefined) => {
        if (res?.chinaVietnamWord === '') res.chinaVietnamWord = undefined;
        if (
          res?.display !== this._currentWord?.display ||
          res?.pinyin !== this._currentWord?.pinyin ||
          res?.define !== this._currentWord?.define ||
          res?.chinaVietnamWord !== this._currentWord?.chinaVietnamWord ||
          res?.hsk !== this._currentWord?.hsk
        )
          this.canEdit = true;
        else this.canEdit = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setValue(data: Partial<Word>) {
    this.dictionaryForm.patchValue({
      wordId: data.wordId,
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
    const formValue: Word = this.dictionaryForm.getRawValue();
    if (formValue.wordId) {
      formValue.updatedDate = new Date();
      this._store.updateWordEffect(formValue);
      this._store.patchState({ isVisible: this.shouldStay, formValue: formValue });
    } else {
      formValue.createdDate = new Date();
      formValue.createdBy = this._userStore.getUserName();
      this._store.createWordEffect(formValue);
      this._store.patchState({ isVisible: this.shouldStay, formValue: undefined });
      this.dictionaryForm.reset();
    }
    this.shouldStay = true;
    this._cdr.detectChanges();
  }

  onCancel() {
    this.dictionaryForm.reset();
    this._store.patchState({ isVisible: false, formValue: undefined });
    this.shouldStay = true;
  }
}
