import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Servicios
import { OficinaService, HerramientasService } from '../../services/services.index';
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

  sinImpObs: Subscription;
  intSinImp: any;

  sinEnvObs: Subscription;
  intSinEnv: any;

  errFacObs: Subscription;
  intErrFac: any;

  errTimObs: Subscription;
  intErrTim: any;

  facturas: number = 0;

  sinImpresion: number = 0;

  sinEnviar: number = 0;

  failFacturar: number = 0;

  failTimbrar: number = 0;

  constructor(
    private _oficina: OficinaService,
    private _herramientas: HerramientasService
  ) {
    this._oficina.todasFacturas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.facturas = resp.respuesta.length;
      } else {
        this.facturas = 0;
      }
    });

    this._oficina.facturasNoImpresas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.sinImpresion = resp.respuesta.length;
      } else {
        this.sinImpresion = 0;
      }
    });

    this._oficina.facturasNoEnviadas(this._herramientas.fechaActual()).subscribe((resp: any) => {
      if (resp.status) {
        this.sinEnviar = resp.respuesta.length;
      } else {
        this.sinEnviar = 0;
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

    this.sinImpObs = this.regresaSinImp().subscribe(
      watch => {
        if (watch.status) {
          this.sinImpresion = watch.respuesta.length;
        } else {
          this.sinImpresion = 0;
        }
      }
    );

    this.sinEnvObs = this.regresaSinEnv().subscribe(
      watch => {
        if (watch.status) {
          this.sinEnviar = watch.respuesta.length;
        } else {
          this.sinEnviar = 0;
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

  regresaSinImp(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intSinImp = setInterval(() => {
        this._oficina.facturasNoImpresas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
        });
      }, 10000);
    });
  }

  regresaSinEnv(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      this.intSinEnv = setInterval(() => {
        this._oficina.facturasNoEnviadas(this._herramientas.fechaActual()).subscribe((resp: any) => {
          observer.next(resp);
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
    this.sinImpObs.unsubscribe();
    this.sinEnvObs.unsubscribe();
    this.errFacObs.unsubscribe();
    this.errTimObs.unsubscribe();
    clearInterval(this.intFact);
    clearInterval(this.intSinImp);
    clearInterval(this.intSinEnv);
    clearInterval(this.intErrFac);
    clearInterval(this.intErrTim);
  }

}
