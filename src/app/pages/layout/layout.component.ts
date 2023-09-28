import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { io } from 'socket.io-client';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationStore } from './notification/notification.store';
import { environment } from '../../../environments/environment';
import { RealtimeService } from './../../core/realtime/realtime.service';
import { AuthenticationService } from './../../core/authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotificationStore, NzMessageService],
})
export class LayoutComponent implements OnInit {
  readonly year: Date = new Date();

  constructor(
    public readonly authService: AuthenticationService,
    private readonly _notification: NzNotificationService,
    private readonly _realtimeService: RealtimeService
  ) {}

  ngOnInit(): void {
    // this.firstNotification();
    this._realtimeService.ws = io(environment.webSocket, { autoConnect: true, transports: ['websocket'] });
    this._realtimeService.ws.connect();
    if (this._realtimeService.ws.connected) {
    } else {
      // this.firstNotification();
      this._realtimeService.ws.connect();
    }

    this._realtimeService.listenToTheSocket('user').subscribe((res) => {
      if (res) this._realtimeService.ws.connect();
    });
  }

  firstNotification() {
    this._notification.blank('Thông báo', 'Realtime hiện không hoạt động!', { nzDuration: 5000 });
  }

  confirm() {
    this.authService.logout();
  }

  cancel() {}
}
