import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload );
  }

  getMessages() {
   return this.wsService.listen('Mensaja-Nueva');
  }

  getMessagesPrivate() {
    return this.wsService.listen('mensaje-privado');
  }


}
