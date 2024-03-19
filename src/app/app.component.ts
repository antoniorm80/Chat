import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat';

  constructor(public wsServce: WebsocketService) {

  }
  ngOnInit(): void {
    console.log('Ke');    
    this.wsServce.checkStatus();
  }
}
