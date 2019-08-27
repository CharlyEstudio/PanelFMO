import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PanelService {

  url: string;

  // path: string = window.location.origin;
  pathPeticion: string = 'http://192.168.1.250';
  // path: string = 'http://' + location.hostname;
  path: string = 'https://ferremayoristas.com.mx';

  constructor(
    private http: HttpClient
  ) { }

  total(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=5';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=5';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=5&fecha=' + fecha;

    return this.http.get( this.url );
  }

  porBajar(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=1';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=1';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=1&fecha=' + fecha;

    return this.http.get( this.url );
  }

  porSurtir(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=2';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=2';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=2&fecha=' + fecha;

    return this.http.get( this.url );
  }

  facturado(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=3';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=3';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=3&fecha=' + fecha;

    return this.http.get( this.url );
  }

  cancelado(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=4';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=4';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=4&fecha=' + fecha;

    return this.http.get( this.url );
  }

  hora(horaIn: any, horaOut: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/linea-tiempo.php?opcion=1&horaIn=' + horaIn + '&horaOut=' + horaOut;
    // } else {
    //   this.url = this.path + '/api/linea-tiempo.php?opcion=1&horaIn=' + horaIn + '&horaOut=' + horaOut;
    // }
    this.url = this.path + '/api/linea-tiempo.php?opcion=1&horaIn=' + horaIn + '&horaOut=' + horaOut;

    return this.http.get( this.url );
  }

  horaZ(horaIn: any, horaOut: any, zona: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/linea-tiempo.php?opcion=2&horaIn=' + horaIn + '&horaOut=' + horaOut + '&zona=' + zona;
    // } else {
    //   this.url = this.path + '/api/linea-tiempo.php?opcion=2&horaIn=' + horaIn + '&horaOut=' + horaOut + '&zona=' + zona;
    // }
    this.url = this.path + '/api/linea-tiempo.php?opcion=2&horaIn=' + horaIn + '&horaOut=' + horaOut + '&zona=' + zona;

    return this.http.get( this.url );
  }

  zonaSurtir(fecha: string, zona: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=9&zona=' + zona;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=9&zona=' + zona;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=9&fecha=' + fecha + '&zona=' + zona;

    return this.http.get( this.url );
  }

  webSurtir(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=34';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=34';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=34&fecha=' + fecha;

    return this.http.get( this.url );
  }

  zonaBajar(fecha: string, zona: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=10&zona=' + zona;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=10&zona=' + zona;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=10&fecha=' + fecha + '&zona=' + zona;

    return this.http.get( this.url );
  }

  webBajar(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=33';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=33';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=33&fecha=' + fecha;

    return this.http.get( this.url );
  }

  zonaFacturado(fecha: string, zona: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=11&zona=' + zona;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=11&zona=' + zona;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=11&fecha=' + fecha + '&zona=' + zona;

    return this.http.get( this.url );
  }

  webFacturado(fecha: string) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=35';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=35';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=35&fecha=' + fecha;

    return this.http.get( this.url );
  }

  asesoresZona( fecha: string, zona: any, tipo: any = 'normal' ) {
    let opcion;

    if (tipo === 'normal') {
      opcion = 20;
    } else if (tipo === 'out') {
      opcion = 32;
    }

    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&zona=' + zona;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&zona=' + zona;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&fecha=' + fecha + '&zona=' + zona;

    return this.http.get( this.url );
  }

  asesoresEsp( fecha: string ) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=21';
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=21';
    // }
    this.url = this.path + '/api/pedidos.php?opcion=21&fecha=' + fecha;

    return this.http.get( this.url );
  }

  informacionGeneral( id: any = '', area: any = '', serie: any = '' ) {
    let opcion;
    if (area === 'zona') {
      opcion = 22;
    } else if (area === 'esp') {
      opcion = 25;
    } else {
      opcion = 30;
    }

    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + id + '&serie=' + serie;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + id + '&serie=' + serie;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + id + '&serie=' + serie;

    return this.http.get( this.url );
  }

  usuarioEspe( id: any ) {
    // SI LLEVA 3001
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250:3001/busqueda/especifico/usuario/' + id;
    // } else {
    //   this.url = this.path +  ':3001/busqueda/especifico/usuario/' + id;
    // }
    this.url = this.path +  ':3001/busqueda/especifico/usuario/' + id;

    return this.http.get( this.url );
  }

  // whatsApp( data: any, tel: any, idFerrum: any ) {
  //   return this.http.post(
  //     // 'https://api.whatsapp.com/send?phone=' + tel + '&text=' + info,
  //     'https://api.whatsapp.com/send?',
  //     {
  //       "recipient_type": "individual",
  //       "to": 524424586395 | tel,
  //       "type": "image",
  //       "image": {
  //         "id": idFerrum,
  //         "caption": data
  //       }
  //     }
  //     );
  // }

  enviarEmail( email: any, idFerrum: any, info: any, asesor: any ) {

    const data = JSON.stringify(info);

    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=23&perid=' + idFerrum
    //               + '&asesor=' + asesor + '&email=' + email + '&info=' + data;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=23&perid=' + idFerrum + '&asesor=' + asesor + '&email=' + email + '&info=' + data;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=23&perid=' + idFerrum + '&asesor=' + asesor + '&email=' + email + '&info=' + data;

    return this.http.get( this.url );
  }

  enviarEmailGeneral() {
    //
  }

  outTime( fecha: string, tipo: any = 'normal', perid: any = '' ) {

    let opcion;

    if (tipo === 'normal') {
      opcion = 24;

      // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
      //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion;
      // } else {
      //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion;
      // }
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&fecha=' + fecha;
    } else if (tipo === 'out') {
      opcion = 31;

      // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
      //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + perid;
      // } else {
      //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + perid;
      // }
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&fecha=' + fecha + '&perid=' + perid;
    }

    return this.http.get( this.url );
  }

  totalPedidosImporte( idFerrum: any, area: any, serie: any = '' ) {
    let opcion;
    if (area === 'zona') {
      opcion = 26;
    } else {
      opcion = 27;
    }

    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;

    return this.http.get( this.url );
  }

  totalClientesPedidos( idFerrum: any, area: any, serie: any = '' ) {
    let opcion;
    if (area === 'zona') {
      opcion = 28;
    } else {
      opcion = 29;
    }

    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    // } else {
    //   this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    // }
    this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;

    return this.http.get( this.url );
  }

  // API de Chóferes
  choferes() {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = `http://192.168.1.250:3001/chofer/all`;
    // } else {
    //   this.url = this.path + ':3001/chofer/all';
    // }
    this.url = this.path + ':3001/chofer/all';

    return this.http.get(this.url);
  }

  entregados(id: any, fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = `http://192.168.1.250:3001/guias/buscar/chofer/entregado/${id}/${fecha}`;
    // } else {
    //   this.url = this.path + ':3001/guias/buscar/chofer/entregado/${id}/${fecha}';
    // }
    this.url = this.path + ':3001/guias/buscar/chofer/entregado/${id}/${fecha}';

    return this.http.get(this.url);
  }

  noEntregados(id: any, fecha: any) {
    // if (this.path === this.pathPeticion || this.path === 'http://localhost') {
    //   this.url = `http://192.168.1.250:3001/guias/buscar/chofer/porentregado/${id}/${fecha}`;
    // } else {
    //   this.url = this.path + ':3001/guias/buscar/chofer/porentregado/${id}/${fecha}';
    // }
    this.url = this.path + ':3001/guias/buscar/chofer/porentregado/${id}/${fecha}';

    return this.http.get(this.url);
  }

  pedidosporAsesor(fecha: string) {
    this.url = this.path + '/api/pedidos.php?opcion=42&fecha=' + fecha;

    return this.http.get(this.url);
  }

  resumenPedidosAsesor(fecha: string) {
    this.url = this.path + '/api/pedidos.php?opcion=43&fecha=' + fecha;

    return this.http.get(this.url);
  }

  resumenCobranzaAsesor(fecha: string) {
    this.url = this.path + '/api/pedidos.php?opcion=44&fecha=' + fecha;

    return this.http.get(this.url);
  }

}
