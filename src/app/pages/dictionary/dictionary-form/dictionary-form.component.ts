import { Notification } from '@models/notification.model';
import { UserProfileStore } from '../../../core/state/user-profile.store';
import { DictionaryStore } from './../dictionary.store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from '@models/word.model';
import { skip, Subject, takeUntil } from 'rxjs';
import { NotificationStore } from '../../layout/notification/notification.store';
import { Guid } from 'guid-typescript';

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
    private readonly _notificationStore: NotificationStore
  ) {}
  readonly formVm$ = this._store.formVm$;

  readonly dictionaryForm: FormGroup = this._formBuilder.group({
    wordId: [],
    display: ['', Validators.compose([Validators.required])],
    pinyin: ['', Validators.compose([Validators.required])],
    chinaVietnamWord: ['', Validators.compose([])],
    type: ['', Validators.compose([])],
    define: ['', Validators.compose([Validators.required])],
    hsk: ['', Validators.compose([Validators.required])],
    reference: ['', Validators.compose([])],
    createdDate: ['', Validators.compose([])],
    updatedDate: ['', Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });
  shouldStay: boolean = true;
  canEdit: boolean = false;
  private _currentWord: Partial<Word> | null;
  private _oldWord: Partial<Word> | null;

  readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.formVm$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res.formValue) {
        if (res.formValue?.chinaVietnamWord === null || res.formValue?.chinaVietnamWord === undefined)
          res.formValue.chinaVietnamWord = '';
        if (res.formValue?.reference === null || res.formValue?.reference === undefined) res.formValue.reference = '';
        this.setValue(res.formValue);
        this._currentWord = res.formValue;
      }
      if (res.oldWord) {
        if (res.oldWord?.chinaVietnamWord === null || res.oldWord?.chinaVietnamWord === undefined)
          res.oldWord.chinaVietnamWord = '';
        if (res.oldWord?.reference === null || res.oldWord?.reference === undefined) res.oldWord.reference = '';
        this._oldWord = res.oldWord;
      }
    });

    this.dictionaryForm.valueChanges
      .pipe(takeUntil(this.destroy$), skip(1))
      .subscribe((res: Partial<Word> | undefined) => {
        if (
          res?.display !== this._currentWord?.display ||
          res?.pinyin !== this._currentWord?.pinyin ||
          res?.define !== this._currentWord?.define ||
          res?.chinaVietnamWord !== this._currentWord?.chinaVietnamWord ||
          res?.type !== this._currentWord?.type ||
          res?.hsk !== this._currentWord?.hsk ||
          res?.reference !== this._currentWord?.reference
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
      type: data.type,
      define: data.define,
      hsk: data.hsk,
      reference: data.reference,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
    });
  }

  onSubmit() {
    const formValue: Word = this.dictionaryForm.getRawValue();
    if (this.dictionaryForm.valid) {
      formValue.chinaVietnamWord = formValue.chinaVietnamWord ? formValue.chinaVietnamWord : '';
      formValue.reference = formValue.reference ? formValue.reference : '';

      // Edit
      if (formValue.wordId) {
        formValue.updatedDate = new Date();
        this._store.updateWordEffect(formValue);
        this._store.patchState({ isVisible: this.shouldStay, formValue: formValue });

        let notification: Notification = {
          notificationId: '',
          createdDate: new Date(),
          createdBy: this._userStore.getUserName(),
          action: 'IS_UPDATED_BY',
          content: `${this._oldWord?.display}[${this._oldWord?.pinyin}] `,
          extraContent: { new: formValue, old: this._oldWord },
          navigate: null,
          isRead: false,
        };
        this._notificationStore.createNotificationEffect(notification);
        this._store.patchState({ oldWord: formValue });
      }
      // Create
      else {
        formValue.wordId = Guid.create().toString();
        formValue.createdDate = new Date();
        formValue.createdBy = this._userStore.getUserName();
        this._store.createWordEffect(formValue);
        this._store.patchState({ isVisible: this.shouldStay, formValue: undefined });
        this.dictionaryForm.reset();

        let notification: Notification = {
          notificationId: '',
          createdDate: new Date(),
          createdBy: this._userStore.getUserName(),
          action: 'IS_CREATED_BY',
          content: `${formValue.display}[${formValue.pinyin}] `,
          extraContent: null,
          navigate: `${formValue.wordId}`,
          isRead: false,
        };
        this._notificationStore.createNotificationEffect(notification);
      }
    }
    this.shouldStay = true;
  }

  onCancel() {
    this.dictionaryForm.reset();
    this._store.patchState({ isVisible: false, formValue: undefined, oldWord: null });
    this.shouldStay = true;
  }
}
