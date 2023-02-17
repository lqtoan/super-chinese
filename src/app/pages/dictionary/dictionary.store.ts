import { FilterType } from '@enums/dictionary.enum';
import { RequestStatus } from '@enums/request-status.enum';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DictionaryService } from '@services/dictionary.service';
import { Word } from '@models/word.model';
import { DEFAULT_DEBOUNCE_TIME } from '@common/default-debounce-time.const';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';

export interface DictionaryState {
  requestStatus: RequestStatus | null;
  filterType: FilterType | null;
  words: Word[];
  keyword: string;
  total: number;
  isVisibleForm: boolean;
  isCreate: boolean;
  formValue: Partial<Word> | undefined;
}

const initialState = {
  requestStatus: null,
  filterType: null,
  words: [],
  keyword: '',
  total: 0,
  isVisibleForm: false,
  isCreate: true,
  formValue: undefined,
};

@Injectable()
export class DictionaryStore extends ComponentStore<DictionaryState> {
  constructor(
    private readonly _service: DictionaryService,
    private readonly _message: NzMessageService,
    private readonly _translateService: TranslateService
  ) {
    super(initialState);
  }
  readonly vm$ = this.select(
    ({ requestStatus, filterType, words, keyword, total }) => ({
      isLoading: requestStatus === 'loading',
      isSuccess: requestStatus === 'success',
      isFail: requestStatus === 'fail',
      filterType,
      words,
      keyword,
      total,
    }),
    {
      debounce: true,
    }
  );
  readonly isVisibleForm$ = this.select((state) => state.isVisibleForm, { debounce: true });
  readonly isCreate$ = this.select((state) => state.isCreate, { debounce: true });
  readonly formValue$ = this.select((state) => state.formValue);
  readonly requestStatus$ = this.select(({ requestStatus }) => ({
    isRequesting: requestStatus === 'loading',
    isSuccess: requestStatus === 'success',
  }));

  //#region Updater
  //#region

  //#region Effect
  readonly loadAllWords = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ requestStatus: 'loading', filterType: 'all' })),
      switchMap(() =>
        this._service.getAllWords().pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: '', words: data, total: data.length });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ requestStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => this.patchState({ requestStatus: 'success' }))
        )
      )
    )
  );
  readonly loadLatestWords = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ requestStatus: 'loading', filterType: 'latest' })),
      switchMap(() =>
        this._service.getLatestWords().pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: '', words: data, total: data.length });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ requestStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => this.patchState({ requestStatus: 'success' }))
        )
      )
    )
  );
  readonly loadSearchResults = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ requestStatus: 'loading', filterType: 'search' })),
      switchMap((param) =>
        this._service.search(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: param, words: data, total: data.length });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ requestStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ requestStatus: 'success' });
          })
        )
      )
    )
  );
  readonly loadWordById = this.effect<string>((trigger$) =>
    trigger$.pipe(
      switchMap((id) =>
        this._service.getWordById(id).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.patchState({ formValue: data, isCreate: false, isVisibleForm: true });
              }
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {})
        )
      )
    )
  );
  readonly createWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ requestStatus: 'loading' })),
      switchMap((param) =>
        this._service.createWord(param).pipe(
          tapResponse(
            (res) => {
              if (res) {
                this.patchState({ requestStatus: 'success' });
                this._message.success(this._translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
              }
            },
            (err: HttpErrorResponse) => {
              this.patchState({ requestStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isVisibleForm: false });
            this.loadLatestWords();
          })
        )
      )
    )
  );
  readonly updateWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ requestStatus: 'loading' })),
      switchMap((param) =>
        this._service.updateWord(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.patchState({ requestStatus: 'success' });
                this._message.success(this._translateService.instant('NOTIFICATION.UPDATE_SUCCESSFULLY'));
              }
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isVisibleForm: false });
            this.loadLatestWords();
          })
        )
      )
    )
  );
  readonly deleteWord = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ requestStatus: 'loading' })),
      switchMap((param) =>
        this._service.deleteWord(param).pipe(
          tapResponse(
            () => {
              this._message.success(this._translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.error.message);
              this.patchState({ requestStatus: 'fail' });
            }
          ),
          finalize(() => {
            this.loadLatestWords();
          })
        )
      )
    )
  );
  readonly speak = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap((text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.7; //set the speed, accepts between [0.1 - 10], defaults to 1
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
      })
    )
  );
  //#region
}
