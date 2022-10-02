import { UserProfileService } from '@services/user-profile.service';
import { UserProfile } from '@models/user-profile.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';

export interface UserProfileState {
  isLoading: boolean;
  profile: UserProfile;
}

const initialState = {
  isLoading: false,
  profile: {
    email: '',
    email_verified: false,
    name: '',
    nickname: '',
    picture: '',
    sub: '',
    updated_at: new Date(),
    created_at: new Date(),
  },
};

@Injectable()
export class UserProfileStore extends ComponentStore<UserProfileState> {
  constructor(private readonly service: UserProfileService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ isLoading, profile }) => ({ isLoading, profile }), { debounce: true });

  readonly loadData = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ isLoading: true });
      }),
      switchMap(() =>
        this.service.getUserProfile().pipe(
          tapResponse(
            (data) => {
              console.log(data);

              this.patchState({ profile: data });
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
}
