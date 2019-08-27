import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { PanelService, SlectFechaService } from '../../services/services.index';

@Component({
  selector: 'app-facturado',
  templateUrl: './facturado.component.html',
  styles: []
})
export class FacturadoComponent implements OnInit, OnDestroy {

  // Fecha Emit
  fechaEmit: string;

  // Facturado
  facturado: number = 0;
  factura: Subscription;
  intFactura: any;

  // Zonas
  qroFac: number = 0;
  txFac: number = 0;
  webFac: number = 0;

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
        this.obtenerRemisionado(fechaEmiter.fecha);

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.factura.unsubscribe();
          clearInterval(this.intFactura);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.observarRemision();
        }
      });

  }

  observarRemision() {
    // Subscrión a Pedidos Remisionados
    this.factura =  this.regresaFactura().subscribe(
      numero => {
        this.facturado = numero.cantidad;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  obtenerRemisionado(fecha: string) {
    // Pedidos Remisionados
    this._panelService.facturado(fecha)
      .subscribe((data) => {
        if ( data[0].importe !== 0 ) {
          this.facturado = data[0].cantidad;
        } else {
          this.facturado = 0;
        }
      });

    // Por Zona
    this._panelService.zonaFacturado(fecha, '02')
      .subscribe( ( data: any ) => {
        this.qroFac = data[0].cantidad;
      });

    this._panelService.zonaFacturado(fecha, '01')
      .subscribe( ( data: any ) => {
        this.txFac = data[0].cantidad;
      });

    this._panelService.webFacturado(fecha)
      .subscribe( ( data: any ) => {
        this.webFac = data[0].cantidad;
      });
  }

  ngOnDestroy() {

    // Intervalo Remisionados
    this.factura.unsubscribe();
    clearInterval(this.intFactura);

  }

  // Observable de Pedidos Remisionados
  regresaFactura(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intFactura = setInterval( () => {

        this._panelService.facturado(this.fechaEmit)
          .subscribe( ( data ) => {

            if (data[0].cantidad !== 0) {
              const factura = {
                cantidad: data[0].cantidad
              };

              observer.next(factura);
            } else {
              const factura = {
                cantidad: 0
              };

              observer.next(factura);
            }

          });

        this._panelService.zonaFacturado(this.fechaEmit, '02')
          .subscribe( ( data: any ) => {
            this.qroFac = data[0].cantidad;
          });

        this._panelService.zonaFacturado(this.fechaEmit, '01')
          .subscribe( ( data: any ) => {
            this.txFac = data[0].cantidad;
          });

        this._panelService.webFacturado(this.fechaEmit)
          .subscribe( ( data: any ) => {
            this.webFac = data[0].cantidad;
          });

      }, 3000);
    })
    .retry();

  }

}
