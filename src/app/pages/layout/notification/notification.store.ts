import { RequestStatus } from '@enums/request-status.enum';
import { Notification } from '@models/notification.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

export interface NotificationState {
  requestStatus: RequestStatus | null;
  notifications: Notification[];
}

const initialState = {
  requestStatus: null,
  notifications: [],
};

@Injectable()
export class NotificationStore extends ComponentStore<NotificationState> {
  constructor(
    private readonly _service: NotificationService,
    private readonly _message: NzMessageService,
    private readonly _translateService: TranslateService
  ) {
    super(initialState);
  }

  readonly vm$ = this.select(
    ({ requestStatus, notifications }) => ({
      requestStatus,
      notifications,
      badgeCount: notifications?.filter((i) => !i.isRead).length,
    }),
    {
      debounce: true,
    }
  );

  //#region Updater
  readonly updateNotifications = this.updater<Notification>((state, notification): NotificationState => {
    const notifications = state.notifications;
    const index = notifications.findIndex((n) => n.notificationId === notification.notificationId);
    index === -1 ? notifications.unshift(notification) : (notifications[index] = notification);
    return {
      ...state,
      notifications,
    };
  });
  readonly markAsRead = this.updater<string | null>((state, notificationId): NotificationState => {
    let notifications: Notification[] = state.notifications;
    notifications = notificationId
      ? notifications.map((x) => (x.notificationId === notificationId ? { ...x, isRead: true } : x))
      : notifications.map((x) => ({ ...x, isRead: true }));
    return {
      ...state,
      notifications: notifications,
    };
  });
  readonly deleteNotification = this.updater<Notification>((state, notification): NotificationState => {
    const notifications = state.notifications;
    const index = notifications.findIndex((n) => n.notificationId === notification.notificationId);
    if (index > -1) notifications.splice(index, 1);
    return {
      ...state,
      notifications,
    };
  });
  //#endregion

  //#region Effect
  readonly loadAllNotificationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ requestStatus: 'loading' });
      }),
      switchMap(() =>
        this._service.getAllNotifications().pipe(
          tapResponse(
            (data: Notification[]) => {
              this.patchState({ notifications: data, requestStatus: 'success' });
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
  readonly loadNotificationsByUserIdEffect = this.effect<string>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ requestStatus: 'loading' });
      }),
      switchMap((param) =>
        this._service.getNotificationsByUserId(param).pipe(
          tapResponse(
            (data: Notification[]) => {
              this.patchState({ notifications: data, requestStatus: 'success' });
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
  readonly createNotificationEffect = this.effect<Notification>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ requestStatus: 'loading' })),
      switchMap((param) =>
        this._service.createNotification(param).pipe(
          tapResponse(
            (data) => {
              this.patchState({ requestStatus: 'success' });
              // this.updateNotifications(data);
              // this._message.success(this._translateService.instant('NOTIFICATION.CREATE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              this.patchState({ requestStatus: 'fail' });
              // this._message.error(err.message);
            }
          ),
          finalize(() => {
            this.patchState({ requestStatus: null });
          })
        )
      )
    )
  );
  readonly maskAsReadEffect = this.effect<string>((params$) =>
    params$.pipe(
      switchMap((param) =>
        this._service.markAsRead(param).pipe(
          tapResponse(
            () => {
              // this.markAsRead(data.notificationId);
              this._message.success(this._translateService.instant('NOTIFICATION.READ_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              // this._message.error(err.message);
            }
          )
        )
      )
    )
  );
  readonly maskAsUnReadEffect = this.effect<string>((params$) =>
    params$.pipe(
      switchMap((param) =>
        this._service.markAsUnRead(param).pipe(
          tapResponse(
            () => {
              // this.markAsRead(data.notificationId);
              // this._message.success(this._translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              // this._message.error(err.message);
            }
          )
        )
      )
    )
  );
  readonly deleteNotificationEffect = this.effect<string>((params$) =>
    params$.pipe(
      switchMap((param) =>
        this._service.deleteNotification(param).pipe(
          tapResponse(
            (data) => {
              this.deleteNotification(data);
              this._message.success(this._translateService.instant('NOTIFICATION.DELETE_SUCCESSFULLY'));
            },
            (err: HttpErrorResponse) => {
              this._message.error(err.message);
            }
          )
        )
      )
    )
  );
}
