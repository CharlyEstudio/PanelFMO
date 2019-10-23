import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

// Alertas
// import Swal from 'sweetalert2';
const Swal = require('sweetalert2');
declare var require: any;

// Servicios
import { PanelService, SlectFechaService, SocketsService } from '../services/services.index';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styles: []
})
export class AsesoresComponent implements OnInit, OnDestroy {

  fechaEmit: string;

  workDay: number = 0;
  cantAse: number = 0;
  importe: number = 0;
  vtaMin: number = 0;
  importMinDia: number = 0;

  cambiar: boolean = false;

  resumenmenorZ1: any[] = [];
  resumenmenorZ2: any[] = [];

  pedidos: number = 0;
  asesores: any[] = [];
  asesores15: any[] = [];
  asesores610: any[] = [];
  asesores1115: any[] = [];
  asesores1620: any[] = [];
  asesores15Cob: any[] = [];
  asesores610Cob: any[] = [];
  asesores1115Cob: any[] = [];
  asesores1620Cob: any[] = [];
  clientesTotales: number = 0;
  clientesPedidosTotales: number = 0;
  clientescobradoTotales: number = 0;
  trabajado: number = 0;
  totalCli15: number = 0;
  totalCliVta15: number = 0;
  totalCliFal15: number = 0;
  totalPed15: number = 0;
  totalImporte15: number = 0;
  totalPendiente15: number = 0;
  totalCli610: number = 0;
  totalCliVta610: number = 0;
  totalCliFal610: number = 0;
  totalPed610: number = 0;
  totalImporte610: number = 0;
  totalPendiente610: number = 0;
  totalCli1115: number = 0;
  totalCliVta1115: number = 0;
  totalCliFal1115: number = 0;
  totalPed1115: number = 0;
  totalImporte1115: number = 0;
  totalPendiente1115: number = 0;
  totalCli1620: number = 0;
  totalCliVta1620: number = 0;
  totalCliFal1620: number = 0;
  totalPed1620: number = 0;
  totalImporte1620: number = 0;
  totalPendiente1620: number = 0;
  totalCliCob15: number = 0;
  totalSaldoCob15: number = 0;
  totalCobrado15: number = 0;
  totalCliCob610: number = 0;
  totalSaldoCob610: number = 0;
  totalCobrado610: number = 0;
  totalCliCob1115: number = 0;
  totalSaldoCob1115: number = 0;
  totalCobrado1115: number = 0;
  totalCliCob1620: number = 0;
  totalSaldoCob1620: number = 0;
  totalCobrado1620: number = 0;
  totalCobranzaCartera: number = 0;
  totalColectado: number = 0;
  asesoresBest: any[] = [];
  asesoresZona1: any[] = [];
  asesoresZona2: any[] = [];
  totalVta: number = 0;
  minimo: number = (19 * 30);

  observando: Subscription;
  intervalo: any;

  importeTotal1: number = 0;
  importeFalta1: number = 0;
  clienteTotal1: number = 0;
  clienteFalta1: number = 0;
  importeTotal2: number = 0;
  importeFalta2: number = 0;
  clienteTotal2: number = 0;
  clienteFalta2: number = 0;

  constructor(
    private socketService: SocketsService,
    private panelService: PanelService,
    private _selectFechaService: SlectFechaService
  ) {
    // Obtenemos la venta mínima diaria
    this.obtenerImporMin();

    // Socket para Importe de venta mínima diaria
    this.socketService.escuchar('cambiar-importe-venta-diaria').subscribe((impo: any) => {
      // Obtenemos la venta mínima diaria
      this.importMinDia = parseFloat(impo);
      this.cambiar = true;
      this.obtenerPedidos(this.fechaEmit);
    });
  }

  ngOnInit() {
    // Obtener fecha para hacer consultas
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        if (fechaEmiter.emitido) {
          Swal.fire({
            title: 'Importe asignado en esa fecha?',
            input: 'number',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            showLoaderOnConfirm: true,
            preConfirm: async (login: any) => {
              this.importMinDia = parseFloat(login);
              return fechaEmiter;
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result: any) => {
            if (result.value) {
              this.fechaEmit = result.value.fecha;
              this.cambiar = result.value.emitido;
              this.cambiar = true;
              this.obtenerPedidos(this.fechaEmit);
              Swal.fire({
                title: `Se cambio la fecha a ${result.value.fecha} y el importe a ${this.importMinDia}`,
                imageUrl: result.value.avatar_url
              });
            }
          });
        } else {
          this.cambiar = true;
          this.fechaEmit = fechaEmiter.fecha;
          // this.cambiar = fechaEmiter.emitido;
          // Obtenemos la venta mínima diaria
          this.obtenerImporMin();
          // Obtener totales
          this.obtenerPedidos(fechaEmiter.fecha);
        }
        const fecWork = new Date(fechaEmiter.fecha);
        fecWork.setDate(fecWork.getDate() + 1);
        this.panelService.obtenerWorkDay((fecWork.getMonth() + 1), fecWork.getFullYear()).subscribe((dias: any) => {
          if (dias.length > 0) {
            this.workDay = dias[0].dias;
          } else {
            this.workDay = 0;
          }
        });

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.observando.unsubscribe();
          clearInterval(this.intervalo);

          // Destrucción de Intervalo de Tiempo
          clearInterval(this.intervalo);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.observacion();
        }
      });
  }

  obtenerImporMin() {
    // Obtenemos la venta mínima diaria
    this.panelService.obtenerImporteVtaDiaria().subscribe((impoMin: any) => {
      if (impoMin.length > 0) {
        this.importMinDia = impoMin[0].data;
      }
    });
  }

  observacion() {
    // Subscrión a Pedidos
    this.observando =  this.regresa().subscribe(
      numero => console.log(numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnDestroy() {
    this.observando.unsubscribe();
    clearInterval(this.intervalo);
  }

  obtenerPedidos(fecha: string) {
    this.best();
    this.resumenVta(fecha);
    // this.resumenCob(fecha);
  }

  best() {
    this.asesoresBest = [];
    this.asesores.sort((a, b) => {
      if (a.IMPORTE < b.IMPORTE) {
        return 1;
      }

      if (a.IMPORTE > b.IMPORTE) {
        return -1;
      }

      return 0;
    });

    for (const ase of this.asesores) {
      if (ase.IMPORTE >= this.importMinDia) {
        this.asesoresBest.push(ase);
      }
    }
  }

  // Observable de Pedidos Cancelados
  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval( () => {

        this.obtenerPedidos(this.fechaEmit);

      }, 10000);
    });

  }

  resumenVta(fecha: string) {
    this.panelService.resumenPedidosAsesor(fecha).subscribe((res: any) => {
      if (res.length > 0) {
        this.cambiar = true;
        let array1 = [];
        let array2 = [];
        this.importeTotal1 = 0;
        this.importeFalta1 = 0;
        this.clienteTotal1 = 0;
        this.clienteFalta1 = 0;
        this.importeTotal2 = 0;
        this.importeFalta2 = 0;
        this.clienteTotal2 = 0;
        this.clienteFalta2 = 0;
        for (const z of res) {
          if (z.INDICE === '(1') {
            array1.push(z);
            this.importeTotal1 += z.IMPORTE;
            this.importeFalta1 += this.importMinDia - z.IMPORTE;
            this.clienteTotal1 += z.DIA_C_VTA;
            this.clienteFalta1 += z.CLIENTES_DIA - z.DIA_C_VTA;
          }
          if (z.INDICE === '(2') {
            this.importeTotal2 += z.IMPORTE;
            this.importeFalta2 += this.importMinDia - z.IMPORTE;
            this.clienteTotal2 += z.DIA_C_VTA;
            this.clienteFalta2 += z.CLIENTES_DIA - z.DIA_C_VTA;
            array2.push(z);
          }
        }
        this.resumenmenorZ1 = array1;
        this.resumenmenorZ2 = array2;
        this.resumenmenorZ1.sort((a, b) => {
          if (a.IMPORTE > b.IMPORTE) {
            return 1;
          }

          if (a.IMPORTE < b.IMPORTE) {
            return -1;
          }

          return 0;
        });
        this.resumenmenorZ2.sort((a, b) => {
          if (a.IMPORTE > b.IMPORTE) {
            return 1;
          }

          if (a.IMPORTE < b.IMPORTE) {
            return -1;
          }

          return 0;
        });
        this.cantAse = res.length;
        if (this.workDay >= 20) {
          const impoMet = this.importMinDia * this.cantAse;
          this.vtaMin = this.importMinDia;
          if (impoMet > 600000) {
            this.importe = 600000;
          } else {
            this.importe = this.vtaMin * this.cantAse;
          }
        } else {
          this.vtaMin = 600000 / this.workDay;
          this.importe = this.vtaMin * this.cantAse;
        }
        this.pedidos = res.length;
        this.asesores15 = [];
        this.asesores610 = [];
        this.asesores1115 = [];
        this.asesores1620 = [];
        this.totalVta = 0;
        this.clientesTotales = 0;
        this.clientesPedidosTotales = 0;
        this.trabajado = 0;
        this.totalCli15 = 0;
        this.totalCliVta15 = 0;
        this.totalCliFal15 = 0;
        this.totalPed15 = 0;
        this.totalImporte15 = 0;
        this.totalPendiente15 = 0;
        this.totalCli610 = 0;
        this.totalCliVta610 = 0;
        this.totalCliFal610 = 0;
        this.totalPed610 = 0;
        this.totalImporte610 = 0;
        this.totalPendiente610 = 0;
        this.totalCli1115 = 0;
        this.totalCliVta1115 = 0;
        this.totalCliFal1115 = 0;
        this.totalPed1115 = 0;
        this.totalImporte1115 = 0;
        this.totalPendiente1115 = 0;
        this.totalCli1620 = 0;
        this.totalCliVta1620 = 0;
        this.totalCliFal1620 = 0;
        this.totalPed1620 = 0;
        this.totalImporte1620 = 0;
        this.totalPendiente1620 = 0;
        for (let i = 0; i < res.length; i++) {
          this.clientesTotales += res[i].CLIENTES_DIA;
          this.clientesPedidosTotales += res[i].DIA_C_VTA;
          this.totalVta += res[i].IMPORTE;
          if (i < 5) {
            // res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 5) + '.';
            res[i].NOMBRE = res[i].NOMBRE.split(')')[1];
            this.asesores15.push(res[i]);
            this.totalCli15 += res[i].CLIENTES_DIA;
            this.totalCliVta15 += res[i].DIA_C_VTA;
            this.totalCliFal15 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed15 += res[i].PEDIDOS;
            this.totalImporte15 += res[i].IMPORTE;
            if (res[i].FALTA > 0) {
              this.totalPendiente15 += res[i].FALTA;
            }
          }
          if (i < 10 && i > 4) {
            // res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            res[i].NOMBRE = res[i].NOMBRE.split(')')[1];
            this.asesores610.push(res[i]);
            this.totalCli610 += res[i].CLIENTES_DIA;
            this.totalCliVta610 += res[i].DIA_C_VTA;
            this.totalCliFal610 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed610 += res[i].PEDIDOS;
            this.totalImporte610 += res[i].IMPORTE;
            if (res[i].FALTA > 0) {
              this.totalPendiente610 += res[i].FALTA;
            }
          }
          if (i < 15 && i > 9) {
            // res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            res[i].NOMBRE = res[i].NOMBRE.split(')')[1];
            this.asesores1115.push(res[i]);
            this.totalCli1115 += res[i].CLIENTES_DIA;
            this.totalCliVta1115 += res[i].DIA_C_VTA;
            this.totalCliFal1115 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed1115 += res[i].PEDIDOS;
            this.totalImporte1115 += res[i].IMPORTE;
            if (res[i].FALTA > 0) {
              this.totalPendiente1115 += res[i].FALTA;
            }
          }
          if (i > 14) {
            // res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            res[i].NOMBRE = res[i].NOMBRE.split(')')[1];
            this.asesores1620.push(res[i]);
            this.totalCli1620 += res[i].CLIENTES_DIA;
            this.totalCliVta1620 += res[i].DIA_C_VTA;
            this.totalCliFal1620 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed1620 += res[i].PEDIDOS;
            this.totalImporte1620 += res[i].IMPORTE;
            if (res[i].FALTA > 0) {
              this.totalPendiente1620 += res[i].FALTA;
            }
          }
        }
        this.trabajado = this.clientesPedidosTotales / this.clientesTotales;
        if (res.length === (this.asesores15.length + this.asesores610.length + this.asesores1115.length + this.asesores1620.length)) {
          this.cambiar = false;
        } else {
          this.cambiar = true;
        }
      }
    });
  }

  resumenCob(fecha: string) {
    this.panelService.resumenCobranzaAsesor(fecha).subscribe((res: any) => {
      if (res.length > 0) {
        this.asesores15Cob = [];
        this.asesores610Cob = [];
        this.asesores1115Cob = [];
        this.asesores1620Cob = [];
        this.totalCliCob15 = 0;
        this.totalSaldoCob15 = 0;
        this.totalCobrado15 = 0;
        this.totalCliCob610 = 0;
        this.totalSaldoCob610 = 0;
        this.totalCobrado610 = 0;
        this.totalCliCob1115 = 0;
        this.totalSaldoCob1115 = 0;
        this.totalCobrado1115 = 0;
        this.totalCliCob1620 = 0;
        this.totalSaldoCob1620 = 0;
        this.totalCobrado1620 = 0;
        this.clientescobradoTotales = 0;
        this.totalCobranzaCartera = 0;
        this.totalColectado = 0;
        for (let i = 0; i < res.length; i++) {
          this.clientescobradoTotales += res[i].DIA_C_COBRO;
          this.totalCobranzaCartera += res[i].COBRO;
          this.totalColectado += res[i].COBRADO;
          if (i < 5) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            this.asesores15Cob.push(res[i]);
            this.totalCliCob15 += res[i].CLI_C_COBRO;
            this.totalSaldoCob15 += res[i].COBRO;
            this.totalCobrado15 += res[i].COBRADO;
          }
          if (i < 10 && i > 4) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            this.asesores610Cob.push(res[i]);
            this.totalCliCob610 += res[i].CLI_C_COBRO;
            this.totalSaldoCob610 += res[i].COBRO;
            this.totalCobrado610 += res[i].COBRADO;
          }
          if (i < 15 && i > 9) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            this.asesores1115Cob.push(res[i]);
            this.totalCliCob1115 += res[i].CLI_C_COBRO;
            this.totalSaldoCob1115 += res[i].COBRO;
            this.totalCobrado1115 += res[i].COBRADO;
          }
          if (i > 14) {
            if (res[i].NOMBRE.split(' ')[2] !== undefined) {
              res[i].NOMBRE = res[i].NOMBRE.split(' ')[1] + ' ' + res[i].NOMBRE.split(' ')[2].substr(0, 3) + '.';
            } else {
              res[i].NOMBRE = res[i].NOMBRE.split(' ')[1];
            }
            this.asesores1620Cob.push(res[i]);
            this.totalCliCob1620 += res[i].CLI_C_COBRO;
            this.totalSaldoCob1620 += res[i].COBRO;
            this.totalCobrado1620 += res[i].COBRADO;
          }
        }
        // this.trabajado = this.clientesPedidosTotales / this.clientesTotales;
      }
    });
  }

}
