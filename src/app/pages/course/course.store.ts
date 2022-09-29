import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Course } from '@models/course.model';
import { CourseService } from '@services/course.service';
import { finalize, switchMap, tap } from 'rxjs/operators';

export interface CourseState {
  isLoading: boolean;
  courses: Course[];
  isVisible: boolean;
  formValue: Partial<Course> | undefined;
}

const initialState = {
  isLoading: false,
  courses: [],
  isVisible: false,
  formValue: undefined,
};

@Injectable()
export class CourseStore extends ComponentStore<CourseState> {
  constructor(private readonly service: CourseService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, courses }) => ({ isLoading, courses }), { debounce: true });

  readonly loadData = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getCourses().pipe(
          tapResponse(
            (data) => {
              this.patchState({ courses: data });
            },
            (error) => {
              // TODO
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
    (state, isVisible): CourseState => ({
      ...state,
      isVisible,
    })
  );

  readonly setFormValue = this.updater<Course | undefined>(
    (state, formValue): CourseState => ({
      ...state,
      formValue,
    })
  );

  readonly formValue$ = this.select((state) => state.formValue);

  readonly createCourse = this.effect<Course>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.createCourse(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                // console.log(data);
                // this.setShowForm(false);
              }
              this.loadData();
            },
            (error) => {
              // TODO
            }
          ),
          finalize(() => {
            this.patchState({ isVisible: false });
          })
        )
      )
    )
  );

  readonly deleteCourse = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((param) =>
        this.service.deleteCourse(param).pipe(
          tapResponse(
            (data) => {
              if (data) {
                // console.log(data);
                // this.setShowForm(false);
              }
              this.loadData();
            },
            (error) => {
              // TODO
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
