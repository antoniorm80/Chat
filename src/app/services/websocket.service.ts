import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  private socket: Socket;


  constructor() { 
    this.socket = io(environment.wsUrl);
    this.checkStatus();
  }

  checkStatus() {
    console.log('mode');
  
    this.socket.on('connect', () => {
      console.log('Conectado al servers');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servers');
      this.socketStatus = false;
    });

  }

}
