import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';
import { Dictionary } from '@models/dictionary.model';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DatePipe } from '@angular/common';

export interface DictionaryState {
  isLoading: boolean;
  words: Dictionary[];
  isVisible: boolean;
  formValue: Partial<Dictionary> | undefined;
}

const initialState = {
  isLoading: false,
  words: [],
  isVisible: false,
  formValue: undefined,
};

@Injectable()
export class DictionaryStore extends ComponentStore<DictionaryState> {
  constructor(
    private readonly service: DictionaryService,
    private readonly message: NzMessageService,
    private readonly translateService: TranslateService,
    private readonly datePipe: DatePipe
  ) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, words }) => ({ isLoading, words }), { debounce: true });

  readonly loadData = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getDictionaries().pipe(
          tapResponse(
            (data) => {
              data.forEach((word) => {
                word.pinyin = word.pinyin.toLowerCase();
                word.define = word.define.toLowerCase();
                word.createdDate = this.datePipe.transform(word.createdDate, 'HH:mm:ss dd/MM/yyyy');
                word.updatedDate = this.datePipe.transform(word.updatedDate, 'HH:mm:ss dd/MM/yyyy');
                word.createdBy = 'toan';
              });
              this.patchState({ words: data });
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

  readonly setFormValue = this.updater<Dictionary | undefined>(
    (state, formValue): DictionaryState => ({
      ...state,
      formValue,
    })
  );

  readonly formValue$ = this.select((state) => state.formValue);

  readonly createDictionary = this.effect<Dictionary>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.createDictionary(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                this.setShowForm(false);
                this.loadData();
                this.message.success(this.translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
              }
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isVisible: false });
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
              this.loadData();
              this.message.success(this.translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (error: HttpErrorResponse) => {
              this.message.error(error.error.message);
            }
          ),
          finalize(() => {
            this.patchState({ isVisible: false });
          })
        )
      )
    )
  );
}
