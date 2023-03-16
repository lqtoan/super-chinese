import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { RealtimeService } from '../../realtime/realtime.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  constructor(private readonly _realtimeService: RealtimeService) {}

  ngOnInit(): void {}
  onClick() {
    // this.service.sendToken();
  }
}
