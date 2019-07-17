import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Servicios
import { OficinaService, HerramientasService, PanelService } from '../../services/services.index';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit, OnDestroy {

  // RXJS
  facTotObs: Subscription;
  intFact: any;
  choferes: any[] = [];

  entregadospObs: Subscription;
  intEntr: any;

  noEntregadosObs: Subscription;
  intNoEntr: any;

  errFacObs: Subscription;
  intErrFac: any;

  errTimObs: Subscription;
  intErrTim: any;

  facturas: number = 0;

  entregados: number = 0;

  noentregados: number = 0;

  failFacturar: number = 0;

  failTimbrar: number = 0;

  constructor(
    private _oficina: OficinaService,
    private _panel: PanelService,
    private _herramientas: HerramientasService
  ) {
    this._oficina.todasFacturas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.facturas = resp.respuesta.length;
      } else {
        this.facturas = 0;
      }
    });

    // Ver entregados por los chóferes
    this._panel.choferes().subscribe((chofer: any) => {
      if (chofer.ok) {
        this.entregados = 0;
        this.choferes = chofer.choferes;
        for (let i = 0; i < chofer.choferes.length; i++) {
          this._panel.entregados(chofer.choferes[i]._id, '2019-06-03').subscribe((entregados: any) => {
            if (entregados.ok) {
              this.entregados += entregados.guia.length;
            } else {
              this.entregados = 0;
            }
          });
        }
      } else {
        this.entregados = 0;
      }
    });

    // Ver no entregados por los chóferes
    this._panel.choferes().subscribe((chofer: any) => {
      if (chofer.ok) {
        this.entregados = 0;
        this.choferes = chofer.choferes;
        for (let i = 0; i < chofer.choferes.length; i++) {
          this._panel.noEntregados(chofer.choferes[i]._id, '2019-06-03').subscribe((noentregados: any) => {
            if (noentregados.ok) {
              this.noentregados += noentregados.guia.length;
            } else {
              this.noentregados = 0;
            }
          });
        }
      } else {
        this.noentregados = 0;
      }
    });

    this._oficina.errorFacturar(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.failFacturar = resp.respuesta.length;
      } else {
        this.failFacturar = 0;
      }
    });

    this._oficina.errorTimbrar(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.failTimbrar = resp.respuesta.length;
      } else {
        this.failTimbrar = 0;
      }
    });
  }

  ngOnInit() {
    this.facTotObs = this.regresaFact().subscribe(
      watch => {
        if (watch.status) {
          this.facturas = watch.respuesta.length;
        } else {
          this.facturas = 0;
        }
      }
    );

    this.entregadospObs = this.regresaEntre().subscribe(
      watch => {
        if (watch.ok) {
          this.entregados = 0;
          this.choferes = watch.choferes;
          for (let i = 0; i < watch.choferes.length; i++) {
            this._panel.entregados(watch.choferes[i]._id, '2019-06-03').subscribe((entregados: any) => {
              if (entregados.ok) {
                this.entregados += entregados.guia.length;
              } else {
                this.entregados = 0;
              }
            });
          }
        } else {
          this.entregados = 0;
        }
      }
    );

    this.noEntregadosObs = this.regresaNoEntr().subscribe(
      watch => {
        if (watch.ok) {
          this.noentregados = 0;
          this.choferes = watch.choferes;
          for (let i = 0; i < watch.choferes.length; i++) {
            this._panel.noEntregados(watch.choferes[i]._id, '2019-06-03').subscribe((noentregados: any) => {
              if (noentregados.ok) {
                this.noentregados += noentregados.guia.length;
              } else {
                this.noentregados = 0;
              }
            });
          }
        } else {
          this.noentregados = 0;
        }
      }
    );

    this.errFacObs = this.regresaErrFac().subscribe(
      watch => {
        if (watch.status) {
          this.failFacturar = watch.respuesta.length;
        } else {
          this.failFacturar = 0;
        }
      }
    );

    this.errTimObs = this.regresaErrtim().subscribe(
      watch => {
        if (watch.status) {
          this.failTimbrar = watch.respuesta.length;
        } else {
          this.failTimbrar = 0;
        }
      }
    );
  }

  regresaFact(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intFact = setInterval(() => {
        this._oficina.todasFacturas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaEntre(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intEntr = setInterval(() => {
        this._panel.choferes().subscribe((chofer: any) => {
          observer.next(chofer);
        });
      }, 10000);
    });
  }

  regresaNoEntr(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intNoEntr = setInterval(() => {
        this._panel.choferes().subscribe((chofer: any) => {
          observer.next(chofer);
        });
      }, 10000);
    });
  }

  regresaErrFac(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intErrFac = setInterval(() => {
        this._oficina.errorFacturar(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaErrtim(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intErrTim = setInterval(() => {
        this._oficina.errorTimbrar(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  ngOnDestroy() {
    this.facTotObs.unsubscribe();
    this.entregadospObs.unsubscribe();
    this.noEntregadosObs.unsubscribe();
    this.errFacObs.unsubscribe();
    this.errTimObs.unsubscribe();
    clearInterval(this.intFact);
    clearInterval(this.intEntr);
    clearInterval(this.intNoEntr);
    clearInterval(this.intErrFac);
    clearInterval(this.intErrTim);
  }

}
