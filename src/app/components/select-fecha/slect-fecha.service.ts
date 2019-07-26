import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SlectFechaService {

  fecha = new EventEmitter<any>();

  constructor() { }

}
