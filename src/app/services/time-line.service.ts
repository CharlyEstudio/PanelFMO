import { Injectable } from '@angular/core';
import { PanelService } from './panel.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TimeLineService {

  // path: string = 'http://' + location.hostname;
  path: string = 'https://ferremayoristas.com.mx';
  url: string;

  constructor(
    public _panelService: PanelService,
    private http: HttpClient
  ) { }

  hora( horaIn: any = '', horaOut: any = '', zona: any = '' ) {
    if ( zona !== '') {
      return this._panelService.horaZ(horaIn, horaOut, zona);
    } else {
      return this._panelService.hora(horaIn, horaOut);
    }
  }

  linea(fecha: string) {
    // if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/linea-tiempo.php?opcion=3';
    // } else {
    //   this.url = this.path + '/api/linea-tiempo.php?opcion=3';
    // }
    this.url = this.path + '/api/linea-tiempo.php?opcion=3&fecha=' + fecha;

    return this.http.get( this.url );
  }

  // zona(zona: any) {
  //   return this._panelService.zona(zona);
  // }

}
