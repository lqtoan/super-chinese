import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DictionaryService } from '@services/dictionary.service';
import { Word } from '@models/word.model';
import { DEFAULT_DEBOUNCE_TIME } from '@common/default-debounce-time.const';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { forkJoin } from 'rxjs';

export interface DictionaryState {
  isLoading: boolean;
  words: Word[];
  newWords: Word[];
  keyword: string;
  total: number;
  isChineseVietnameseSearch: boolean;
  isVisibleForm: boolean;
  isCreate: boolean;
  formValue: Partial<Word> | undefined;
  // pageInfo: PageInfo;
  recently: Word[];
}

const initialState = {
  isLoading: false,
  words: [],
  newWords: [],
  keyword: '',
  total: 0,
  isChineseVietnameseSearch: false,
  isVisibleForm: false,
  isCreate: true,
  formValue: undefined,
  recently: [],
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
    this.state$,
    ({ isLoading, words, newWords, total, isChineseVietnameseSearch }) => ({
      isLoading,
      words,
      newWords,
      total,
      isChineseVietnameseSearch,
    }),
    {
      debounce: true,
    }
  );
  // readonly words$ = this.select(this.state$, ({ words }) => words);
  readonly isChineseVietnameseSearch = (): boolean => this.get().isChineseVietnameseSearch;
  readonly isVisibleForm$ = this.select((state) => state.isVisibleForm, { debounce: true });
  readonly isCreate$ = this.select((state) => state.isCreate, { debounce: true });
  readonly formValue$ = this.select((state) => state.formValue);

  //#region Updater
  readonly addRecently = this.updater<Word>((state, word): DictionaryState => {
    state.recently.unshift(word);
    return {
      ...state,
    };
  });
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
      tap(() => {
        this.patchState({ isLoading: true });
      }),
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
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );
  readonly refreshData = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.loadData();
      })
    )
  );
  readonly loadSearchResults = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap((param) => {
        return forkJoin([this.service.getChineseWords(param), this.service.getVietnameseWords(param)]).pipe(
          tapResponse(
            (data) => {
              const words: Word[] = [];
              data[0].forEach((word) => {
                words.push(word), this.addRecently(word);
              });
              data[1].forEach((word) => {
                words.push(word), this.addRecently(word);
              });
              this.patchState({ words: words, total: words.length });
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
              this.refreshData();
            }
          ),
          finalize(() => {
            this.patchState({ isLoading: false });
          })
        );
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
      tap(() => this.patchState({ isLoading: true })),
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
            this.refreshData();
          })
        )
      )
    )
  );
  readonly updateWord = this.effect<Word>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
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
            this.refreshData();
          })
        )
      )
    )
  );
  readonly deleteWord = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
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
            this.refreshData();
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
