import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment.development';
import Usuario from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  private socket: Socket;
  public usuario: Usuario | any = '';

  constructor() { 
    this.socket = io(environment.wsUrl);
    this.cargarStorage();
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

  loginWS( nombre: string) {

    return new Promise ( (resolve, reject) => {
       this.emit ( 'configurar-usuario', { nombre }, (resp: any) => {
        this.usuario = new Usuario( nombre);
        this.guardarStorage();
        resolve(true);
    });
    });
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {

    if ( localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.loginWS( this.usuario.nombre);
    }
  }

}
