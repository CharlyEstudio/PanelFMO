import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { PanelService } from '../../services/services.index';

@Component({
  selector: 'app-surtir',
  templateUrl: './surtir.component.html',
  styles: []
})
export class SurtirComponent implements OnInit, OnDestroy {

  // Por Surtir
  porSurtir: number = 0;
  surtir: Subscription;
  intSurtir: any;

  // Total por Zona
  qroSur: number = 0;
  txSur: number = 0;
  webSur: number = 0;

  // Tiempo
  intTiempo: any;
  hora: number;
  minutos: number;
  fecha: number = new Date().getDay();

  // Alertas
  critico: boolean = false;
  inestable: boolean = false;
  estable: boolean = false;
  correcto: boolean = true;

  constructor(
    private _panelService: PanelService
  ) {

    // Subscrión a Pedidos por Bajar
    this.surtir =  this.regresaSurtir().subscribe(
      numero => {
        this.porSurtir = numero.cantidad;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {

    // Obtener la hora
    this.verTiempo();

    // Pedidos por Bajar
    this._panelService.porSurtir()
      .subscribe((data) => {
        if ( data[0].cantidad !== 0 ) {
          this.porSurtir = data[0].cantidad;
        } else {
          this.porSurtir = 0;
        }
      });

    // Pedidos Totales por Bajar Querétaro
    this._panelService.zonaSurtir('02')
      .subscribe( ( data ) => {
        this.qroSur = data[0].cantidad;
      });

    // Pedidos Totales por Bajar Tequisquiapan
    this._panelService.zonaSurtir('01')
      .subscribe( ( data ) => {
        this.txSur = data[0].cantidad;
      });

    // Pedidos Totales Web
    this._panelService.webSurtir()
      .subscribe( ( data ) => {
        this.webSur = data[0].cantidad;
      });

  }

  ngOnDestroy() {

    // Intervalo por Bajar
    this.surtir.unsubscribe();
    clearInterval(this.intSurtir);

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
      const porcent = ( this.porSurtir * 100 ) / 350;
      // console.log(this.hora + ':' + this.minutos);
      // console.log(this.fecha);

      if ( this.hora >= 17 && this.minutos >= 30 ) {

        if ( porcent < 24 ) {

          this.estable = true;
          this.inestable = false;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent < 25 ) {

          this.estable = false;
          this.inestable = true;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent > 30 ) {

          this.estable = false;
          this.inestable = false;
          this.critico = true;
          this.correcto = false;

        }

      }

      if ( this.hora >= 18 && this.minutos >= 30 ) {

        if ( porcent < 16 ) {

          this.estable = true;
          this.inestable = false;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent > 15 ) {

          this.estable = false;
          this.inestable = true;
          this.critico = false;
          this.correcto = false;

        } else if ( porcent > 20 ) {

          this.estable = false;
          this.inestable = false;
          this.critico = true;
          this.correcto = false;

        }

      }

    }, 1000);
  }

  // Observable de Pedidos por Bajar
  regresaSurtir(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intSurtir = setInterval( () => {

        this._panelService.porSurtir()
          .subscribe( ( data ) => {

            if (data[0].importe !== 0) {
              const surtir = {
                cantidad: data[0].cantidad
              };

              observer.next(surtir);
            } else {
              const surtir = {
                cantidad: 0
              };

              observer.next(surtir);
            }

          });

        // Querétaro
        this._panelService.zonaSurtir('02')
          .subscribe( ( data ) => {
            this.qroSur = data[0].cantidad;
          });

        // Tequisquiapan
        this._panelService.zonaSurtir('01')
          .subscribe( ( data ) => {
            this.txSur = data[0].cantidad;
          });

        // Pedidos Totales Web
        this._panelService.webSurtir()
          .subscribe( ( data ) => {
            // console.log(data);
            this.webSur = data[0].cantidad;
          });

      }, 3000);
    })
    .retry();

  }

}
