import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

// Servicios
import { PanelService } from '../services/services.index';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styles: []
})
export class AsesoresComponent implements OnInit {

  asesores: any[] = [];
  asesores15: any[] = [];
  asesores610: any[] = [];
  asesores1115: any[] = [];
  asesores1620: any[] = [];
  clientesTotales: number = 0;
  clientesPedidosTotales: number = 0;
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
  asesoresBest: any[] = [];
  asesoresZona1: any[] = [];
  asesoresZona2: any[] = [];
  totalVta: number = 0;

  observando: Subscription;
  intervalo: any;

  // Dona
  graficos: any = {
    'general': {
      'labels': ['Logrado', '600,000'],
      'data':  [0, 600000],
      'type': 'doughnut',
      'leyenda': '$ 500,000 Vta Diaría'
    }
  };

  constructor(
    private panelService: PanelService
  ) {
    this.obtenerPedidos();

    // Subscrión a Pedidos
    this.observando =  this.regresa().subscribe(
      numero => {},
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {
  }

  obtenerPedidos() {
    this.panelService.pedidosporAsesor().subscribe((ase: any) => {
      if (ase.length > 0) {
        this.totalVta = 0;
        this.asesores = ase;
        this.graficos = '';
        let zona1 = [];
        let zona2 = [];
        let pedidos = [];
        let minimo = [];
        let razonable = [];
        let hecho = [];
        for (const a of ase) {
          if (a.INDICE === '(1') {
            const agregar1 = {
              'CLIENTES_DIA': a.CLIENTES_DIA,
              'DIA_C_VTA': a.DIA_C_VTA,
              'DIA_S_VTA': (a.CLIENTES_DIA - a.DIA_C_VTA),
              'FALTA': a.FALTA,
              'IMPORTE': a.IMPORTE,
              'INDICE': a.INDICE,
              'NOMBRE': a.NOMBRE,
              'PEDIDOS': a.PEDIDOS,
              'PERID': a.PERID,
              'RUTA': a.RUTA,
              'TITULO': a.NOMBRE.split(' ')[1]
            };
            zona1.push(agregar1);
          }
          if (a.INDICE === '(2') {
            const agregar2 = {
              'CLIENTES_DIA': a.CLIENTES_DIA,
              'DIA_C_VTA': a.DIA_C_VTA,
              'DIA_S_VTA': (a.CLIENTES_DIA - a.DIA_C_VTA),
              'FALTA': a.FALTA,
              'IMPORTE': a.IMPORTE,
              'INDICE': a.INDICE,
              'NOMBRE': a.NOMBRE,
              'PEDIDOS': a.PEDIDOS,
              'PERID': a.PERID,
              'RUTA': a.RUTA,
              'TITULO': a.NOMBRE.split(' ')[1]
            };
            zona2.push(agregar2);
          }
          pedidos.push(a.PEDIDOS);
          minimo.push(20);
          razonable.push(22);
          hecho.push(27);
          this.totalVta += a.IMPORTE;
        }
        this.asesoresZona1 = zona1;
        this.asesoresZona2 = zona2;
        this.graficos = {
          'general': {
            'labels': [this.totalVta, 'Meta'],
            'data':  [this.totalVta, (600000 - this.totalVta)],
            'type': 'doughnut',
            'leyenda': 'Remisionado'
          }
        };
        this.best();
        this.resumen();
      }
    });
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
      if (ase.IMPORTE >= 27000) {
        this.asesoresBest.push(ase);
      }
    }
  }

  // Observable de Pedidos Cancelados
  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval( () => {

        this.obtenerPedidos();

      }, 10000);
    })
    .retry();

  }

  resumen() {
    this.panelService.resumenPedidosAsesor().subscribe((res: any) => {
      if (res.length > 0) {
        this.asesores15 = [];
        this.asesores610 = [];
        this.asesores1115 = [];
        this.asesores1620 = [];
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
          if (i < 5) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1];
            this.asesores15.push(res[i]);
            this.totalCli15 += res[i].CLIENTES_DIA;
            this.totalCliVta15 += res[i].DIA_C_VTA;
            this.totalCliFal15 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed15 += res[i].PEDIDOS;
            this.totalImporte15 += res[i].IMPORTE;
            this.totalPendiente15 += res[i].FALTA;
          }
          if (i < 10 && i > 4) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1];
            this.asesores610.push(res[i]);
            this.totalCli610 += res[i].CLIENTES_DIA;
            this.totalCliVta610 += res[i].DIA_C_VTA;
            this.totalCliFal610 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed610 += res[i].PEDIDOS;
            this.totalImporte610 += res[i].IMPORTE;
            this.totalPendiente610 += res[i].FALTA;
          }
          if (i < 15 && i > 9) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1];
            this.asesores1115.push(res[i]);
            this.totalCli1115 += res[i].CLIENTES_DIA;
            this.totalCliVta1115 += res[i].DIA_C_VTA;
            this.totalCliFal1115 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed1115 += res[i].PEDIDOS;
            this.totalImporte1115 += res[i].IMPORTE;
            this.totalPendiente1115 += res[i].FALTA;
          }
          if (i > 14) {
            res[i].NOMBRE = res[i].NOMBRE.split(' ')[1];
            this.asesores1620.push(res[i]);
            this.totalCli1620 += res[i].CLIENTES_DIA;
            this.totalCliVta1620 += res[i].DIA_C_VTA;
            this.totalCliFal1620 += (res[i].CLIENTES_DIA - res[i].DIA_C_VTA);
            this.totalPed1620 += res[i].PEDIDOS;
            this.totalImporte1620 += res[i].IMPORTE;
            this.totalPendiente1620 += res[i].FALTA;
          }
        }
        this.trabajado = this.clientesPedidosTotales / this.clientesTotales;
      }
    });
  }

}
