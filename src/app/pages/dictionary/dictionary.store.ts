import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';
import { Dictionary } from '@models/dictionary.model';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';

export interface DictionaryState {
  isLoading: boolean;
  words: Dictionary[];
  total: number;
  isVisible: boolean;
  isCreate: boolean;
  formValue: Partial<Dictionary> | undefined;
}

const initialState = {
  isLoading: false,
  words: [],
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

  readonly vm$ = this.select(({ isLoading, words, total }) => ({ isLoading, words, total }), { debounce: true });

  readonly loadData = this.effect(($) =>
    $.pipe(
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
            // this.patchState({ isVisible: false });
            this.loadData();
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
            // this.patchState({ isVisible: false });
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
}
