import { DEFAULT_DEBOUNCE_TIME } from './../../core/common/default-debounce-time.const';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';
import { Dictionary } from '@models/dictionary.model';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TableHeader } from 'src/app/shared/table/models';
import { from } from 'rxjs';

export interface DictionaryState {
  isLoading: boolean;
  headers: TableHeader<Dictionary>[];
  words: Dictionary[];
  keyword: string;
  total: number;
  isVisible: boolean;
  isCreate: boolean;
  formValue: Partial<Dictionary> | undefined;
}

const initialState = {
  isLoading: false,
  headers: [],
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
    private readonly service: DictionaryService,
    private readonly message: NzMessageService,
    private readonly translateService: TranslateService
  ) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, headers, words, total }) => ({ isLoading, headers, words, total }), {
    debounce: true,
  });

  readonly filter$ = from(this.select(({ keyword }) => keyword));
  readonly setFilter = this.effect<string>((params$) =>
    params$.pipe(
      tap((params) => {
        this.patchState({
          keyword: params,
        });
      })
    )
  );

  readonly loadData = this.effect<string>(($) =>
    $.pipe(
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap((keyword) =>
        this.service.getDictionaries(keyword).pipe(
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

  readonly getDictionaryById = this.effect<string>((trigger$) =>
    trigger$.pipe(
      // tap(() => this.patchState({ isLoading: true })),
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
          finalize(() => {
            // this.patchState({ isLoading: false });
          })
        )
      )
    )
  );

  readonly headers$ = this.select((state) => state.headers, { debounce: true });
  readonly setHeaders = this.updater<TableHeader<Dictionary>[]>(
    (state, headers): DictionaryState => ({
      ...state,
      headers,
    })
  );

  readonly isVisibleForm$ = this.select((state) => state.isVisible, { debounce: true });
  readonly setShowForm = this.updater<boolean>(
    (state, isVisible): DictionaryState => ({
      ...state,
      isVisible,
    })
  );

  readonly isCreate$ = this.select((state) => state.isCreate, { debounce: true });
  readonly setIsCreate = this.updater<boolean>(
    (state, isCreate): DictionaryState => ({
      ...state,
      isCreate,
    })
  );

  readonly formValue$ = this.select((state) => state.formValue);
  readonly setFormValue = this.updater<Dictionary | undefined>(
    (state, formValue): DictionaryState => ({
      ...state,
      formValue,
    })
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
            this.patchState({ isLoading: false });
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
            this.patchState({ isLoading: false });
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
            this.patchState({ isLoading: false });
          })
        )
      )
    )
  );
}
