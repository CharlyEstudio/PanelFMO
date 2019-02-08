import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

import { PanelService } from '../../services/services.index';

@Component({
  selector: 'app-out-time',
  templateUrl: './out-time.component.html',
  styles: []
})
export class OutTimeComponent implements OnInit, OnDestroy {

  // Time
  time: any;
  hora: any;
  min: any;

  // Booleanos
  mostrar: boolean = false;
  alertaGeneral: boolean = false;
  errorGeneral: boolean = false;

  // Observable
  observar: Subscription;
  intervalo: any;

  // Datos de Pedidos después de las 6:15
  datos: any[] = [];

  constructor(
    private _panelService: PanelService
  ) {

    // Subscrión a Pedidos despues del tiempo
    this.observar =  this.regresa().subscribe(
      numero =>{
        this.datos = numero;
      },
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );

  }

  // Observable de Pedidos por Bajar
  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval( () => {
        this.time = new Date();
        this.hora = this.time.getHours();
        this.min = this.time.getMinutes();

        // Obtener pedidos despues de las 6:15pm
        if(this.hora >= 18 && this.min >= 15) {
          this.mostrar = true;
          this._panelService.outTime()
            .subscribe( ( resp: any ) => {
              observer.next(resp);
            });
        }

      }, 1000);
    })
    .retry();

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.observar.unsubscribe();
    clearInterval(this.intervalo);
  }

  enviarReporte() {
    console.log('Enviando...');

    this._panelService.asesoresZona( 1, 'out' )
      .subscribe( ( asesores: any ) => {

        for(let i = 0; i < asesores.length; i++) {

          this._panelService.outTime( 'out', asesores[i].perid )
            .subscribe( ( out: any ) => {

              this._panelService.usuarioEspe( asesores[i].perid )
                .subscribe( ( resp: any ) => {

                  this._panelService.enviarEmail(resp.usuarios[0].email, resp.usuarios[0].idFerrum, out, asesores[i].nombre)
                    .subscribe( ( envio: any ) => {
                      if(envio[0].status === 'ok') {
                        this.alertaGeneral = true;
                        setTimeout(() => {this.alertaGeneral = false;}, 2000);
                      } else {
                        this.errorGeneral = true;
                        setTimeout(() => {this.errorGeneral = false;}, 2000);
                      }
                    });

                });

            });

        }

      });

    this._panelService.asesoresZona( 2, 'out' )
      .subscribe( ( asesores: any ) => {

        for(let i = 0; i < asesores.length; i++) {

          this._panelService.outTime( 'out', asesores[i].perid )
            .subscribe( ( out: any ) => {

              this._panelService.usuarioEspe( asesores[i].perid )
                .subscribe( ( resp: any ) => {

                  this._panelService.enviarEmail(resp.usuarios[0].email, resp.usuarios[0].idFerrum, out, asesores[i].nombre)
                    .subscribe( ( envio: any ) => {
                      if(envio[0].status === 'ok') {
                        this.alertaGeneral = true;
                        setTimeout(() => {this.alertaGeneral = false;}, 2000);
                      } else {
                        this.errorGeneral = true;
                        setTimeout(() => {this.errorGeneral = false;}, 2000);
                      }
                    });

                });

            });

        }

      });
  }

}
