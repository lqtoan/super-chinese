import { FilterType } from './interfaces/dictionary.type';
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
  index: number;
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
  index: 1,
  total: 0,
  isVisibleForm: false,
  isCreate: true,
  formValue: undefined,
};

@Injectable()
export class DictionaryStore extends ComponentStore<DictionaryState> {
  constructor(
    private readonly service: DictionaryService,
    private readonly message: NzMessageService,
    private readonly translateService: TranslateService
  ) {
    super(initialState);
  }
  readonly vm$ = this.select(
    ({ requestStatus, filterType, words, keyword, index, total }) => ({
      isLoading: requestStatus === 'loading',
      isSuccess: requestStatus === 'success',
      isFail: requestStatus === 'fail',
      filterType,
      words,
      keyword,
      index,
      total,
    }),
    {
      debounce: true,
    }
  );
  readonly filterType$ = this.select((state) => state.filterType, { debounce: true });
  readonly isVisibleForm$ = this.select((state) => state.isVisibleForm, { debounce: true });
  readonly isCreate$ = this.select((state) => state.isCreate, { debounce: true });
  readonly formValue$ = this.select((state) => state.formValue);

  //#region Updater
  readonly setRequestStatus = this.updater<RequestStatus>(
    (state, requestStatus): DictionaryState => ({
      ...state,
      requestStatus,
    })
  );
  readonly setFilterType = this.updater<FilterType>(
    (state, filterType): DictionaryState => ({
      ...state,
      filterType,
    })
  );
  readonly setKeyword = this.updater<string>(
    (state, keyword): DictionaryState => ({
      ...state,
      keyword,
    })
  );
  setShowForm = this.updater<boolean>(
    (state, isVisibleForm): DictionaryState => ({
      ...state,
      isVisibleForm,
    })
  );
  readonly setIsCreate = this.updater<boolean>(
    (state, isCreate): DictionaryState => ({
      ...state,
      isCreate,
    })
  );
  readonly setFormValue = this.updater<Word | undefined>(
    (state, formValue): DictionaryState => ({
      ...state,
      formValue,
    })
  );
  //#region

  //#region Effect
  readonly loadData = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.setRequestStatus('loading')),
      switchMap(() =>
        this.service.getWords().pipe(
          tapResponse(
            (data) => {
              this.patchState({ words: data, total: data.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => this.setRequestStatus('success'))
        )
      )
    )
  );
  readonly loadSearchResults = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => this.setRequestStatus('loading')),
      switchMap((param) =>
        this.service.search(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ words: data, total: data.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.setRequestStatus('success');
          })
        )
      )
    )
  );
  readonly scrollToIndex = this.effect<number>(($) =>
    $.pipe(
      tap((index) => {
        document
          .getElementsByTagName('app-dictionary-item')
          [index - 1].scrollIntoView({ block: 'start', behavior: 'smooth' });
      })
    )
  );
  readonly loadWordById = this.effect<string>((trigger$) =>
    trigger$.pipe(
      switchMap((id) =>
        this.service.getWordById(id).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.setFormValue(data);
                this.setIsCreate(false);
                this.setShowForm(true);
              }
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {})
        )
      )
    )
  );
  readonly createWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.setRequestStatus('loading')),
      switchMap((param) =>
        this.service.createWord(param).pipe(
          tapResponse(
            (res) => {
              if (res) {
                this.message.success(this.translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
              }
            },
            (error: HttpErrorResponse) => {
              console.log(error.error.message);
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.setShowForm(false);
            this.loadData();
          })
        )
      )
    )
  );
  readonly updateWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.setRequestStatus('loading')),
      switchMap((param) =>
        this.service.updateWord(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.message.success(this.translateService.instant('NOTIFICATION.UPDATE_SUCCESSFULLY'));
              }
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.setShowForm(false);
            this.loadData();
          })
        )
      )
    )
  );
  readonly deleteWord = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.setRequestStatus('loading')),
      switchMap((param) =>
        this.service.deleteWord(param).pipe(
          tapResponse(
            () => {
              this.message.success(this.translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
              console.log(error);
            }
          ),
          finalize(() => {
            this.loadData();
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
