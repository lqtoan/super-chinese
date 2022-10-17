import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';
import { Dictionary } from '@models/dictionary.model';
import { DEFAULT_DEBOUNCE_TIME } from '@common/default-debounce-time.const';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TableHeader } from 'src/app/shared/table/models';

export interface DictionaryState {
  isLoading: boolean;
  headers: TableHeader<Dictionary>[];
  words: Dictionary[];
  keyword: string;
  total: number;
  isChineseVietnameseSearch: boolean;
  isVisibleForm: boolean;
  isCreate: boolean;
  formValue: Partial<Dictionary> | undefined;
  // pageInfo: PageInfo;
}

const initialState = {
  isLoading: false,
  headers: [],
  words: [],
  keyword: '',
  total: 0,
  isChineseVietnameseSearch: false,
  isVisibleForm: false,
  isCreate: true,
  formValue: undefined,
  // pageInfo: { page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE, total: 0 },
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
    ({ isLoading, words, total, isChineseVietnameseSearch }) => ({
      isLoading,
      words,
      total,
      isChineseVietnameseSearch,
    }),
    {
      debounce: true,
    }
  );

  readonly setHeaders = this.updater<TableHeader<Dictionary>[]>(
    (state, headers): DictionaryState => ({
      ...state,
      headers,
    })
  );

  readonly setIsChineseVietnameseSearch = this.updater<boolean>(
    (state, isChineseVietnameseSearch): DictionaryState => ({
      ...state,
      isChineseVietnameseSearch,
    })
  );

  readonly setShowForm = this.updater<boolean>(
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

  readonly setFormValue = this.updater<Dictionary | undefined>(
    (state, formValue): DictionaryState => ({
      ...state,
      formValue,
    })
  );

  readonly headers$ = this.select((state) => state.headers, { debounce: true });
  readonly isChineseVietnameseSearch = (): boolean => this.get().isChineseVietnameseSearch;
  readonly isVisibleForm$ = this.select((state) => state.isVisibleForm, { debounce: true });
  readonly isCreate$ = this.select((state) => state.isCreate, { debounce: true });
  readonly formValue$ = this.select((state) => state.formValue);

  readonly loadData = this.effect(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getDictionaries().pipe(
          tapResponse(
            (data) => {
              this.patchState({ words: data, total: data.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );

  readonly loadVietnameseWords = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap((param) =>
        this.service.getVietnameseWords(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ words: data, total: data.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );

  readonly loadChineseWords = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap((param) =>
        this.service.getChineseWords(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ words: data, total: data.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );

  readonly loadWordById = this.effect<string>((trigger$) =>
    trigger$.pipe(
      switchMap((id) =>
        this.service.getDictionaryById(id).pipe(
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

  readonly createDictionary = this.effect<Dictionary>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.createDictionary(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.setShowForm(false);
                this.message.success(this.translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
              }
            },
            (error: HttpErrorResponse) => {
              console.log(error.error.message);
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.loadData();
          })
        )
      )
    )
  );

  readonly updateDictionary = this.effect<Dictionary>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.updateDictionary(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.setShowForm(false);
                this.message.success(this.translateService.instant('NOTIFICATION.UPDATE_SUCCESSFULLY'));
              }
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.loadData();
          })
        )
      )
    )
  );

  readonly deleteDictionary = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.deleteDictionary(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                // console.log(data);
                // this.setShowForm(false);
              }
              this.message.success(this.translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
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
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.7; //set the speed, accepts between [0.1 - 10], defaults to 1
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
      })
    )
  );
}
