import { RealtimeService } from 'src/app/core/realtime/realtime.service';
import { Notification } from '@models/notification.model';
import { NotificationStore } from '../../state/notification.store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnInit {
  constructor(private readonly _store: NotificationStore, private readonly _realtimeService: RealtimeService) {}

  readonly vm$ = this._store.vm$;

  ngOnInit(): void {
    this._store.loadDataEffect();

    this._realtimeService.listenToTheSocket('new-notification').subscribe((res: Notification) => {
      this._store.updateNotifications(res);
    });
  }

  onMarkAsRead(notification: Notification) {
    console.log(notification);
    this._store.maskAsReadEffect(notification.notificationId);

    let updatedNotification = notification;
    updatedNotification.isRead = true;
    this._store.updateNotifications(updatedNotification);
  }
}
