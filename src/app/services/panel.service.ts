import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PanelService {

  url: string;

  // path: string = window.location.origin;
  // path: string = 'http://192.168.1.250';
  path: string = 'http://' + location.hostname;


  constructor(
    private http: HttpClient
  ) { }

  total() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=5';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=5';
    }

    return this.http.get( this.url );
  }

  porBajar() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=1';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=1';
    }

    return this.http.get( this.url );
  }

  porSurtir() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=2';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=2';
    }

    return this.http.get( this.url );
  }

  facturado() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=3';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=3';
    }

    return this.http.get( this.url );
  }

  cancelado() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=4';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=4';
    }

    return this.http.get( this.url );
  }

  hora(horaIn: any, horaOut: any) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/linea-tiempo.php?opcion=1&horaIn=' + horaIn + '&horaOut=' + horaOut;
    } else {
      this.url = this.path + '/api/linea-tiempo.php?opcion=1&horaIn=' + horaIn + '&horaOut=' + horaOut;
    }

    return this.http.get( this.url );
  }

  horaZ(horaIn: any, horaOut: any, zona: any) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/linea-tiempo.php?opcion=2&horaIn=' + horaIn + '&horaOut=' + horaOut + '&zona=' + zona;
    } else {
      this.url = this.path + '/api/linea-tiempo.php?opcion=2&horaIn=' + horaIn + '&horaOut=' + horaOut + '&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  zonaSurtir(zona: any) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=9&zona=' + zona;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=9&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  webSurtir() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=34';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=34';
    }

    return this.http.get( this.url );
  }

  zonaBajar(zona: any) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=10&zona=' + zona;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=10&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  webBajar() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=33';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=33';
    }

    return this.http.get( this.url );
  }

  zonaFacturado(zona: any) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=11&zona=' + zona;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=11&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  webFacturado() {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=35';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=35';
    }

    return this.http.get( this.url );
  }

  asesoresZona( zona: any, tipo: any = 'normal' ) {
    let opcion;

    if (tipo === 'normal') {
      opcion = 20;
    } else if (tipo === 'out') {
      opcion = 32;
    }

    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&zona=' + zona;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&zona=' + zona;
    }

    return this.http.get( this.url );
  }

  asesoresEsp( ) {
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=21';
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=21';
    }

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

    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + id + '&serie=' + serie;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + id + '&serie=' + serie;
    }

    return this.http.get( this.url );
  }

  usuarioEspe( id: any ) {
    // SI LLEVA 3001
    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250:3001/busqueda/especifico/usuario/' + id;
    } else {
      this.url = this.path +  ':3001/busqueda/especifico/usuario/' + id;
    }

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

    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=23&perid=' + idFerrum
                  + '&asesor=' + asesor + '&email=' + email + '&info=' + data;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=23&perid=' + idFerrum + '&asesor=' + asesor + '&email=' + email + '&info=' + data;
    }

    return this.http.get( this.url );
  }

  enviarEmailGeneral() {
    //
  }

  outTime( tipo: any = 'normal', perid: any = '' ) {

    let opcion;

    if (tipo === 'normal') {
      opcion = 24;

      if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
        this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion;
      } else {
        this.url = this.path + '/api/pedidos.php?opcion=' + opcion;
      }
    } else if (tipo === 'out') {
      opcion = 31;

      if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
        this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + perid;
      } else {
        this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + perid;
      }
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

    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    }

    return this.http.get( this.url );
  }

  totalClientesPedidos( idFerrum: any, area: any, serie: any = '' ) {
    let opcion;
    if (area === 'zona') {
      opcion = 28;
    } else {
      opcion = 29;
    }

    if (this.path === 'http://192.168.1.250' || this.path === 'http://localhost') {
      this.url = 'http://192.168.1.250/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    } else {
      this.url = this.path + '/api/pedidos.php?opcion=' + opcion + '&perid=' + idFerrum + '&serie=' + serie;
    }

    return this.http.get( this.url );
  }

}
