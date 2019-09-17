import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketsService {

  socketStatus: boolean = false;

  constructor(
    private socket: Socket,
  ) { }

  checkStatusServer() {
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor');
      this.socketStatus = true;
      // swal('Servidor Conectado', '', 'success');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor');
      this.socketStatus = false;
      // localStorage.removeItem('socketUsuario');
      // this.router.navigateByUrl('/login');
      // swal('Servidor Desconectado', 'No actualice y/o guarde alguna información. Revise en login si ya está OnLine.', 'warning');
    });
  }

  acciones( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar( evento: string ) {
    return this.socket.fromEvent(evento);
  }

}
