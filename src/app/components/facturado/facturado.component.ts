import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { PanelService } from '../../services/services.index';

@Component({
  selector: 'app-facturado',
  templateUrl: './facturado.component.html',
  styles: []
})
export class FacturadoComponent implements OnInit, OnDestroy {

  // Facturado
  facturado: number = 0;
  factura: Subscription;
  intFactura: any;

  // Zonas
  qroFac: number = 0;
  txFac: number = 0;

  // Alertas
  correcto: boolean = true;

  constructor(
    private _panelService: PanelService
  ) {

    // Subscrión a Pedidos por Bajar
    this.factura =  this.regresaFactura().subscribe(
      numero => {
        this.facturado = numero.cantidad;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {

    // Pedidos por Bajar
    this._panelService.facturado()
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.facturado = data[0].cantidad;
        } else {
          this.facturado = 0;
        }
      });

    // Por Zona
    this._panelService.zonaFacturado('02')
      .subscribe( ( data: any ) => {
        this.qroFac = data[0].cantidad;
      });

    this._panelService.zonaFacturado('01')
      .subscribe( ( data: any ) => {
        this.txFac = data[0].cantidad;
      });

  }

  ngOnDestroy() {

    // Intervalo por Bajar
    this.factura.unsubscribe();
    clearInterval(this.intFactura);

  }

  // Observable de Pedidos por Bajar
  regresaFactura(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intFactura = setInterval( () => {

        this._panelService.facturado()
          .subscribe( ( data ) => {

            if(data[0].cantidad != 0) {
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

        this._panelService.zonaFacturado('02')
          .subscribe( ( data: any ) => {
            this.qroFac = data[0].cantidad;
          });

        this._panelService.zonaFacturado('01')
          .subscribe( ( data: any ) => {
            this.txFac = data[0].cantidad;
          });

      }, 3000);
    })
    .retry();

  }

}
