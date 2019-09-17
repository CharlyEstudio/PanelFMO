import { Component, OnInit } from '@angular/core';

// Servicios
import { SocketsService } from './services/services.index';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private socketService: SocketsService
  ) {
    this.socketService.checkStatusServer();
  }

  ngOnInit() {
    init_plugins();
  }

}
