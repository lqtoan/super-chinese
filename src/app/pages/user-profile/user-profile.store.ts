import { UserProfileService } from '@services/user-profile.service';
import { UserProfile } from '@models/user-profile.model';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { RequestStatus } from '@enums/request-status.enum';

export interface UserProfileState {
  requestStatus: RequestStatus | null;
  profile: UserProfile;
}

const initialState = {
  requestStatus: null,
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
  constructor(private readonly _service: UserProfileService) {
    super(initialState);
  }

  readonly vm$ = this.select(({ requestStatus, profile }) => ({ requestStatus, profile }), { debounce: true });

  readonly loadData = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ requestStatus: 'loading' });
      }),
      switchMap(() =>
        this._service.getUserProfile().pipe(
          tapResponse(
            (data: UserProfile) => {
              // console.log(data);
              this.patchState({ profile: data, requestStatus: 'success' });
            },
            (error) => {
              this.patchState({ requestStatus: 'fail' });
            }
          ),
          finalize(() => {
            this.patchState({ requestStatus: null });
          })
        )
      )
    )
  );

  readonly getUserName = (): string => this.get().profile.nickname;
  readonly getEmail = (): string => this.get().profile.email;
}
