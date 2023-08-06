import { RealtimeService } from 'src/app/core/realtime/realtime.service';
import { Notification } from '@models/notification.model';
import { NotificationStore } from '../../state/notification.store';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit, OnDestroy {
  constructor(private readonly _store: NotificationStore, private readonly _realtimeService: RealtimeService) {}

  readonly vm$ = this._store.vm$;
  readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this._store.loadAllNotificationsEffect();

    this._realtimeService.listenToTheSocket('new-notification').subscribe((res: Notification) => {
      this._store.updateNotifications(res);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickNotification(notification: Notification) {
    if (notification.isRead) {
      this._store.maskAsUnReadEffect(notification.notificationId);
    } else {
      this._store.maskAsReadEffect(notification.notificationId);
    }
    let updatedNotification = notification;
    updatedNotification.isRead = !notification.isRead;
    this._store.updateNotifications(updatedNotification);
  }
}
