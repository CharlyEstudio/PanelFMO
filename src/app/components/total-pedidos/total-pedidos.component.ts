import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PanelService, SlectFechaService } from '../../services/services.index';

@Component({
  selector: 'app-total-pedidos',
  templateUrl: './total-pedidos.component.html',
  styles: []
})
export class TotalPedidosComponent implements OnInit, OnDestroy {

  // Esta fecha será modificado cuando se emita un cambio o si es actual
  fechaEmit: string;

  // Menores de 15 pedidos en rojo ---- OJO

  // No. Pedidos Total | No. de Clientes Diferentes Total | Importe Total de los Pedidos
  totalPICantidad = 0;
  totalPIImporte = 0;
  totalClientes = 0;

  // Pedidos Totales por categoria
  zona1: any[] = [];
  zona2: any[] = [];
  especiales: any[] = [];
  info: any[] = [];
  canZ1 = 0;
  canZ2 = 0;
  canEsp = 0;
  nomAsesor: any;
  idFerrum = 0;

  // Alertas
  alerta = false;
  error = false;
  alertaGeneral = false;
  errorGeneral = false;
  boton = false;

  // Por Surtir
  tot = 0;
  total: Subscription;
  intTot: any;

  // Tiempo
  intTiempo: any;
  hora: number;
  minutos: number;

  // Alertas
  critico = false;
  inestable = false;
  estable = false;
  correcto = true;

  constructor(
    private _panelService: PanelService,
    private _selectFechaService: SlectFechaService
  ) {}

  ngOnInit() {

    // Obtener fecha para hacer consultas
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        this.fechaEmit = fechaEmiter.fecha;

        // Obtener totales
        this.obtenerTotales(fechaEmiter.fecha);

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.total.unsubscribe();
          clearInterval(this.intTot);

          // Destrucción de Intervalo de Tiempo
          clearInterval(this.intTiempo);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.observarTotal();
          // Obtener la hora
          this.verTiempo();
        }
      });

  }

  observarTotal() {
    // Subscrión a Pedidos por Bajar
    this.total =  this.regresar().subscribe(
      numero => {
        switch (numero.length) {
          case 1:
            this.tot = numero[0].cantidad;
            break;
          case 2:
            this.tot = numero[0].cantidad + numero[1].cantidad;
            break;
          case 3:
            this.tot = numero[0].cantidad + numero[1].cantidad + numero[2].cantidad;
            break;
        }
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  obtenerTotales(fecha: string) {
    this.tot = 0;
    this.canZ1 = 0;
    this.canZ2 = 0;
    this.canEsp = 0;
    // Pedidos Total
    this._panelService.total(fecha)
      .subscribe((data: any) => {
        if (data.length > 0) {
          switch (data.length) {
            case 1:
              this.tot = data[0].cantidad;
              break;
            case 2:
              this.tot = data[0].cantidad + data[1].cantidad;
              break;
            case 3:
              this.tot = data[0].cantidad + data[1].cantidad + data[2].cantidad;
              break;
          }
        } else  {
          this.tot = 0;
        }
      });

    // Asesores zona 1
    this._panelService.asesoresZona( fecha, 1 )
      .subscribe( ( resp: any ) => {
        this.zona1 = resp;

        for (let i = 0; i < resp.length; i++) {
          this.canZ1 += resp[i].cantidad;
        }
      });

    // Asesores zona 2
    this._panelService.asesoresZona( fecha, 2 )
      .subscribe( ( resp: any ) => {
        this.zona2 = resp;

        for (let i = 0; i < resp.length; i++) {
          this.canZ2 += resp[i].cantidad;
        }
      });

    // Asesores Especiales
    this._panelService.asesoresEsp(fecha)
      .subscribe( ( resp: any ) => {
        this.especiales = resp;
        for (let i = 0; i < resp.length; i++) {
          this.canEsp += resp[i].cantidad;
        }
      });
  }

  ngOnDestroy() {

    // Intervalo por Bajar
    this.total.unsubscribe();
    clearInterval(this.intTot);

    // Destrucción de Intervalo de Tiempo
    clearInterval(this.intTiempo);

  }

  verTiempo() {
    this.intTiempo = setInterval(() => {
      // Hora
      if ( this.hora !== new Date().getHours() ) {
        this.hora = new Date().getHours();
      }

      // Minutos
      if ( this.minutos !== new Date().getMinutes() ) {
        this.minutos = new Date().getMinutes();
      }

      // Tiempo
      const porcent = ( this.tot * 100 ) / 350;

      if ( this.hora >= 17 && this.minutos >= 30 ) {

        if ( porcent < 75 ) {

          this.estable = false;
          this.inestable = false;
          this.critico = true;
          this.correcto = false;

        } else if ( porcent < 81 ) {

          this.estable = false;
          this.inestable = true;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent > 80 ) {

          this.estable = true;
          this.inestable = false;
          this.critico = false;
          this.correcto = false;

        }

      }

      if ( this.hora >= 18 && this.minutos >= 30 ) {

        if ( porcent < 85 ) {

          this.estable = false;
          this.inestable = false;
          this.critico = true;
          this.correcto = false;

        } else if ( porcent < 91 ) {

          this.estable = false;
          this.inestable = true;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent > 90 ) {

          this.estable = true;
          this.inestable = false;
          this.critico = false;
          this.correcto = false;

        }

      }

    }, 1000);
  }

  // Observable de Pedidos por Bajar
  regresar(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {
      this.intTot = setInterval( () => {

        this._panelService.total(this.fechaEmit)
          .subscribe( ( data ) => {
            observer.next(data);
          });

        // Asesores zona 1
        this._panelService.asesoresZona( this.fechaEmit, 1 )
          .subscribe( ( resp: any ) => {
            this.canZ1 = 0;
            this.zona1 = resp;

            for (let i = 0; i < resp.length; i++) {
              this.canZ1 += resp[i].cantidad;
            }

          });

        // Asesores zona 2
        this._panelService.asesoresZona( this.fechaEmit, 2 )
          .subscribe( ( resp: any ) => {
            this.canZ2 = 0;
            this.zona2 = resp;

            for (let i = 0; i < resp.length; i++) {
              this.canZ2 += resp[i].cantidad;
            }
          });

        // Asesores Especiales
        this._panelService.asesoresEsp(this.fechaEmit)
          .subscribe( ( resp: any ) => {
            this.canEsp = 0;
            this.especiales = resp;

            for (let i = 0; i < resp.length; i++) {
              this.canEsp += resp[i].cantidad;
            }
          });

      }, 3000);
    });

  }

  abrirModal( data: any, area: any ) {
    this.boton = true;
    this.info = [];
    this.totalPICantidad = 0;
    this.totalPIImporte = 0;
    this.totalClientes = 0;
    this.nomAsesor = data.nombre;
    this.idFerrum = data.perid;

    let enviar;

    if (area === 'esp') {
      this.boton = false;
      if (data.serie === 'A') {
        enviar = data.perid;
      } else {
        enviar = data.serie;
      }
    } else {
      enviar = data.perid;
    }

    this._panelService.informacionGeneral( data.perid, area, data.serie, this.fechaEmit )
      .subscribe( ( resp: any ) => {
        this.info = resp;
      });

    this._panelService.totalPedidosImporte(data.perid, area, data.serie, this.fechaEmit)
      .subscribe( ( resp: any ) => {
        this.totalPICantidad = resp[0].PEDIDOS;
        this.totalPIImporte = resp[0].IMPORTE;
      });

    this._panelService.totalClientesPedidos(data.perid, area, data.serie, this.fechaEmit)
      .subscribe( ( resp: any ) => {
        this.totalClientes = resp.length;
      });

  }

  enviarEmail( info: any, idFerrum: any, asesor: any ) {
    // html2canvas(document.querySelector('#capture')).then( (canvas: any) => {

    //   let link = document.createElement('a');

    //   link.download = 'imagen.png';

    //   link.href = canvas.toDataURL('image/png');

    //   // link.click();

    // });

    this._panelService.usuarioEspe( idFerrum )
      .subscribe( ( resp: any ) => {

        this._panelService.enviarEmail(resp.usuarios[0].email, idFerrum, info, asesor)
          .subscribe( ( envio: any ) => {
            if (envio[0].status === 'ok') {
              this.alerta = true;
              setTimeout(() => {this.alerta = false; }, 2000);
            } else {
              this.error = true;
              setTimeout(() => {this.error = false; }, 2000);
            }
          });

      });
  }

  enviarReporte() {
    // Asesores zona 1
    this._panelService.asesoresZona( this.fechaEmit, 1 )
      .subscribe( ( reporte: any ) => {

        for (let i = 0; i < reporte.length; i++) {

          this._panelService.informacionGeneral( reporte[i].perid, 'zona', '', this.fechaEmit )
            .subscribe( ( info: any ) => {

              console.log(info);

              this._panelService.usuarioEspe( reporte[i].perid )
                .subscribe( ( resp: any ) => {

                  this._panelService.enviarEmail(resp.usuarios[0].email, resp.usuarios[0].idFerrum, info, reporte[i].nombre)
                    .subscribe( ( envio: any ) => {
                      if (envio[0].status === 'ok') {
                        this.alertaGeneral = true;
                        setTimeout(() => { this.alertaGeneral = false; }, 2000);
                      } else {
                        this.errorGeneral = true;
                        setTimeout(() => { this.errorGeneral = false; }, 2000);
                      }
                    });

                });

            });

        }

      });

    // Asesores zona 2
    this._panelService.asesoresZona( this.fechaEmit, 2 )
      .subscribe( ( reporte: any ) => {

        for (let i = 0; i < reporte.length; i++) {

          this._panelService.informacionGeneral( reporte[i].perid, 'zona', '' , this.fechaEmit )
            .subscribe( ( info: any ) => {

              this._panelService.usuarioEspe( reporte[i].perid )
                .subscribe( ( resp: any ) => {

                  this._panelService.enviarEmail(resp.usuarios[0].email, resp.usuarios[0].idFerrum, info, reporte[i].nombre)
                    .subscribe( ( envio: any ) => {
                      if (envio[0].status === 'ok') {
                        this.alertaGeneral = true;
                        setTimeout(() => { this.alertaGeneral = false; }, 2000);
                      } else {
                        this.errorGeneral = true;
                        setTimeout(() => { this.errorGeneral = false; }, 2000);
                      }
                    });

                });

            });

        }

      });
  }

}
