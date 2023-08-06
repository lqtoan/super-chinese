import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RealtimeService } from '../realtime/realtime.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { NotificationStore } from '../state/notification.store';
import { NzMessageService } from 'ng-zorro-antd/message';

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
