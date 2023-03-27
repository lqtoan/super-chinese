import { UserProfile } from '@models/user-profile.model';
import { UserProfileStore } from './../../state/user-profile.store';
import { RealtimeService } from 'src/app/core/realtime/realtime.service';
import { Notification } from '@models/notification.model';
import { NotificationStore } from '../../state/notification.store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [UserProfileStore],
})
export class NotificationComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _store: NotificationStore,
    private readonly _userStore: UserProfileStore,
    private readonly _realtimeService: RealtimeService
  ) {}

  readonly vm$ = this._store.vm$;
  readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    // this._store.loadDataEffect();
    this._userStore.vm$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res.profile.name) this._store.loadNotificationsByUserIdEffect(res.profile.name);
    });

    this._realtimeService
      .listenToTheSocket('new-notification')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Notification) => {
        this._store.updateNotifications(res);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMarkAsRead(notification: Notification) {
    this._store.maskAsReadEffect(notification.notificationId);

    let updatedNotification = notification;
    updatedNotification.isRead = true;
    this._store.updateNotifications(updatedNotification);
  }
}
