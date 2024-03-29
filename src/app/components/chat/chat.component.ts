import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  texto = '';
  mensajesSubscription?: Subscription;
  mensajes: any[] = [];  
  elemento: HTMLElement | any;
  @ViewChild('chatMensajes') chatMensajes?: ElementRef;

  constructor(public wsChat: ChatService){}

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription =  this.wsChat.getMessages().subscribe((msg: any) => {
      // console.log(msg);   
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
        
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.mensajesSubscription?.unsubscribe();
  }
  enviar() {
    
    if (this.texto.trim().length === 0) {
      return;
    }
    
    this.wsChat.sendMessage(this.texto);
    this.texto = '';
    
  }





}
