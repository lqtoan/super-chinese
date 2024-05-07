import { RealtimeChannel } from '@enums/realtime-channel.enum';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  socket: Socket;
  constructor() {}

  listenToTheSocket(channel: RealtimeChannel): Observable<any> {
    let data$ = new Subject<any>();
    // this.socket = io('https://super-chinese.cyclic.app', { withCredentials: true });
    this.socket = io(environment.webSocket, { autoConnect: true, transports: ['websocket'] });

    this.socket.on(channel, (data: string) => {
      if (data) {
        data$.next(data);
      }
    });
    return data$;
  }

  sendMessage(channel: string, message: string) {
    this.socket.emit(channel, { message: message });
  }
}
