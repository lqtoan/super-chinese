import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private SOCKET_ENDPOINT = environment.api;
  ws: any;
  constructor() {}

  listenToTheSocket() {
    this.ws = io(this.SOCKET_ENDPOINT);
    this.ws.on('message-broadcast', (data: string) => {
      if (data) console.log(data);
    });
  }

  sendMessage(message: string) {
    this.ws.emit('message', { message: message });
  }
}
