import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OficinaService {

  url: string;

  // path: string = 'http://' + location.hostname;
  pathPeticion: string = 'http://192.168.1.250';
  path: string = 'https://ferremayoristas.com.mx';

  constructor(
    private http: HttpClient
  ) { }

  todasFacturas(fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/oficina/facturas/' + fecha;
    // } else {
    //   this.url = this.path + '/oficina/facturas/' + fecha;
    // }
    this.url = this.path + '/oficina/facturas/' + fecha;

    return this.http.get(this.url);
  }

  facturasNoImpresas(fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/oficina/facturas/noimpresas/' + fecha;
    // } else {
    //   this.url = this.path + '/oficina/facturas/noimpresas/' + fecha;
    // }
    this.url = this.path + '/oficina/facturas/noimpresas/' + fecha;

    return this.http.get(this.url);
  }

  facturasNoEnviadas(fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/oficina/facturas/noenviadas/' + fecha;
    // } else {
    //   this.url = this.path + '/oficina/facturas/noenviadas/' + fecha;
    // }
    this.url = this.path + '/oficina/facturas/noenviadas/' + fecha;

    return this.http.get(this.url);
  }

  errorFacturar(fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/oficina/facturas/error/facturar/' + fecha;
    // } else {
    //   this.url = this.path + '/oficina/facturas/error/facturar/' + fecha;
    // }
    this.url = this.path + '/oficina/facturas/error/facturar/' + fecha;

    return this.http.get(this.url);
  }

  errorTimbrar(fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/oficina/facturas/error/timbrar/' + fecha;
    // } else {
    //   this.url = this.path + '/oficina/facturas/error/timbrar/' + fecha;
    // }
    this.url = this.path + '/oficina/facturas/error/timbrar/' + fecha;

    return this.http.get(this.url);
  }

}
