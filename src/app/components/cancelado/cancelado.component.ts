import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { PanelService, SlectFechaService } from '../../services/services.index';

@Component({
  selector: 'app-cancelado',
  templateUrl: './cancelado.component.html',
  styles: []
})
export class CanceladoComponent implements OnInit, OnDestroy {

  // Fecha Emit
  fechaEmit: string;

  // Cancelado
  cancelado: number = 0;
  cancelar: Subscription;
  intCancelar: any;

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
        this.obtenerCancelados(fechaEmiter.fecha);

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.cancelar.unsubscribe();
          clearInterval(this.intCancelar);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.observarCancelados();
        }
      });

  }

  observarCancelados() {
    // Subscrión a Pedidos Cancelados
    this.cancelar =  this.regresaCancelar().subscribe(
      numero => {
        this.cancelado = numero.cantidad;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  obtenerCancelados(fecha: string) {
    // Pedidos Cancelados
    this._panelService.cancelado(fecha)
      .subscribe((data) => {
        if ( data[0].importe != 0 ) {
          this.cancelado = data[0].cantidad;
        } else {
          this.cancelado = 0;
        }
      });
  }

  ngOnDestroy() {

    // Intervalo Cancelados
    this.cancelar.unsubscribe();
    clearInterval(this.intCancelar);

  }

  // Observable de Pedidos Cancelados
  regresaCancelar(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intCancelar = setInterval( () => {

        this._panelService.cancelado(this.fechaEmit)
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

      }, 3000);
    })
    .retry();

  }

}
