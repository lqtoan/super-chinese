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
  gettingStatus: RequestStatus | null;
  submittingStatus: RequestStatus | null;
  filterType: FilterType | null;
  words: Word[];
  keyword: string;
  total: number;
  isVisible: boolean;
  isCreate: boolean;
  formValue: Partial<Word> | undefined;
}

const initialState = {
  gettingStatus: null,
  submittingStatus: null,
  filterType: null,
  words: [],
  keyword: '',
  total: 0,
  isVisible: false,
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
    ({ gettingStatus, filterType, words, keyword, total }) => ({
      isLoading: gettingStatus === 'loading',
      isSuccess: gettingStatus === 'success',
      isFail: gettingStatus === 'fail',
      filterType,
      words,
      keyword,
      total,
    }),
    {
      debounce: true,
    }
  );
  readonly formVm$ = this.select(({ isVisible, isCreate, formValue, submittingStatus }) => ({
    isVisible,
    isCreate,
    formValue,
    isSubmitting: submittingStatus === 'loading',
    isSubmitted: submittingStatus === 'success',
    isSubmitFail: submittingStatus === 'fail',
  }))

  //#region Updater
  // readonly updateCanEdit = this.updater<boolean>(
  //   (state, isCanEdit): DictionaryState => ({
  //     ...state,
  //     isCanEdit
  //   })
  // );
  //#region

  //#region Effect
  readonly loadAllWords = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ gettingStatus: 'loading', filterType: 'all' })),
      switchMap(() =>
        this._service.getAllWords().pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: '', words: data, total: data.length, gettingStatus: 'success' });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ gettingStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => this.patchState({ gettingStatus: null }))
        )
      )
    )
  );
  readonly loadLatestWords = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ gettingStatus: 'loading', filterType: 'latest' })),
      switchMap(() =>
        this._service.getLatestWords().pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: '', words: data, total: data.length, gettingStatus: 'success' });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ gettingStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => this.patchState({ gettingStatus: null }))
        )
      )
    )
  );
  readonly loadSearchResults = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.patchState({ gettingStatus: 'loading', filterType: 'search' })),
      switchMap((param) =>
        this._service.search(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ keyword: param, words: data, total: data.length, gettingStatus: 'success' });
            },
            (err: HttpErrorResponse) => {
              this.patchState({ gettingStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ gettingStatus: null });
          })
        )
      )
    )
  );
  readonly createWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ submittingStatus: 'loading' })),
      switchMap((param) =>
        this._service.createWord(param).pipe(
          tapResponse(
            () => {
              this.patchState({ submittingStatus: 'success' });
              this.loadLatestWords();
              this._message.success(this._translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              this.patchState({ submittingStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ submittingStatus: null });
          })
        )
      )
    )
  );
  readonly updateWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ submittingStatus: 'loading' })),
      switchMap((param) =>
        this._service.updateWord(param).pipe(
          tapResponse(
            () => {
                this.patchState({ submittingStatus: 'success' });
                this.loadLatestWords();
                this._message.success(this._translateService.instant('NOTIFICATION.UPDATE_SUCCESSFULLY'));
              },
              (err: HttpErrorResponse) => {
              this.patchState({ submittingStatus: 'fail' });
              this._message.error(err.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ submittingStatus: null });
          })
        )
      )
    )
  );
  readonly deleteWord = this.effect<string>((params$) =>
    params$.pipe(
      switchMap((param) =>
        this._service.deleteWord(param).pipe(
          tapResponse(
            () => {
              this.loadLatestWords();
              this._message.success(this._translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.error.message);
            }
          ),
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
