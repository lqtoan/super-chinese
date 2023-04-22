import { RealtimeChannel } from '@enums/realtime-channel.enum';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private SOCKET_ENDPOINT = environment.webSocket;
  ws: Socket;
  constructor() {}

  listenToTheSocket(channel: RealtimeChannel): Observable<any> {
    let data$ = new Subject<any>();
    // this.ws = io('https://super-chinese.cyclic.app', { withCredentials: true });
    this.ws = io(environment.webSocket, { autoConnect: true, transports: ['websocket'] });
    this.ws.connect();

    this.ws.on(channel, (data: string) => {
      console.log(this.ws);
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
