import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      
    this.socket.on('connect', () => {
      // console.log('Conectado al servers');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      // console.log('Desconectado del servers');
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?: any, callback?: Function) {
    // emit ('EVENTO', payload, callback?)
    this.socket.emit( evento, payload, callback );
  }

  listen(evento: string) {
    //  Esta instrucción no funionó 
    // return this.socket.fromEvent( evento );
    return new Observable((subscriber) => {
      this.socket.on(evento, (data) => {
        subscriber.next(data);
      })
    })
  
  }

}
