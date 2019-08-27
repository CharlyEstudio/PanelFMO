import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PanelService, SlectFechaService } from '../../services/services.index';

import { SweetAlert } from 'sweetalert/typings/core';

@Component({
  selector: 'app-bajar',
  templateUrl: './bajar.component.html',
  styles: []
})
export class BajarComponent implements OnInit, OnDestroy {

  // Fecha Emit
  fechaEmit: string;

  // Por Bajar
  porBajar: number = 0;
  bajar: Subscription;
  intBajar: any;

  // Total por Zona
  qroBaj: number = 0;
  txBaj: number = 0;
  webBaj: number = 0;

  // Alertas
  correcto: boolean = true;

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
        this.obtenerBajar(fechaEmiter.fecha);

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.bajar.unsubscribe();
          clearInterval(this.intBajar);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.observarBajar();
        }
      });
  }

  observarBajar() {
    // Subscrión a Pedidos por Bajar
    this.bajar =  this.regresaBajar().subscribe(
      numero => {
        this.porBajar = numero.cantidad;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  obtenerBajar(fecha: string) {
    // Pedidos por Bajar
    this._panelService.porBajar(fecha)
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.porBajar = data[0].cantidad;
        } else {
          this.porBajar = 0;
        }
      });

    // Pedidos Totales por Bajar Querétaro
    this._panelService.zonaBajar(fecha, '02')
      .subscribe( ( data ) => {
        this.qroBaj = data[0].cantidad;
      });

    // Pedidos Totales por Bajar Tequisquiapan
    this._panelService.zonaBajar(fecha, '01')
      .subscribe( ( data ) => {
        this.txBaj = data[0].cantidad;
      });

    // Pedidos Totales por Bajar WEB
    this._panelService.webBajar(fecha)
      .subscribe( ( data ) => {
        this.webBaj = data[0].cantidad;
      });
  }

  ngOnDestroy() {
    // Intervalo por Bajar
    this.bajar.unsubscribe();
    clearInterval(this.intBajar);
  }

  // Observable de Pedidos por Bajar
  regresaBajar(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intBajar = setInterval( () => {

        this._panelService.porBajar(this.fechaEmit)
          .subscribe( ( data ) => {

            if (data[0].cantidad !== 0) {
              const bajar = {
                cantidad: data[0].cantidad
              };

              observer.next(bajar);
            } else {
              const bajar = {
                cantidad: 0
              };

              observer.next(bajar);
            }

          });

          // Querétaro
        this._panelService.zonaBajar(this.fechaEmit, '02')
          .subscribe( ( data ) => {
            this.qroBaj = data[0].cantidad;
          });

        // Tequisquiapan
        this._panelService.zonaBajar(this.fechaEmit, '01')
          .subscribe( ( data ) => {
            // console.log(data);
            this.txBaj = data[0].cantidad;
          });

        // Pedidos Totales por Bajar WEB
        this._panelService.webBajar(this.fechaEmit)
          .subscribe( ( data ) => {
            this.webBaj = data[0].cantidad;
          });

      }, 3000);
    })
    .retry();

  }

}
