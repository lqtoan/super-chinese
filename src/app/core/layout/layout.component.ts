import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  readonly year: Date = new Date();
  constructor(
    public readonly authService: AuthenticationService,
    private readonly notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.firstNotification();
  }

  firstNotification() {
    this.notification.blank('Bảo trì', 'Tính năng files nghe giáo trình hiện đang được bảo trì.');
  }
}
