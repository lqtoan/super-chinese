import { RealtimeChannel } from '@enums/realtime-channel.enum';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private SOCKET_ENDPOINT = environment.webSocket;
  ws: any;
  constructor() {}

  listenToTheSocket(channel: RealtimeChannel): Observable<any> {
    let data$ = new Subject<any>();
    this.ws = io(this.SOCKET_ENDPOINT, {});
    this.ws.on(channel, (data: string) => {
      if (data) {
        data$.next(data);
      }
    });
    return data$;
  }

  sendMessage(channel: string, message: string) {
    this.ws.emit(channel, { message: message });
  }
}
