import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeLineService, SlectFechaService } from '../../services/services.index';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styles: []
})
export class TimeLineComponent implements OnInit, OnDestroy {

  // Fecha Emit
  fechaEmit: string;

  hora: any;

  // Gráfica
  lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT QRO'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT TX'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'FACTURADOS'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'WEB'},
    {data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35], label: 'PELIGRO'},
    {data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], label: 'RAZONABLE'},
    {data: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55], label: 'MUY BUENO'}
  ];

  lineChartLabels: Array<any> = ['8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20'];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
              min: 0,
              max: 55,
              stepSize: 5
          }
        }
      ]
    }
  };

  lineChartColors: Array<any> = [
    { // rojo
      backgroundColor: 'rgba(206, 52, 76,0.2)', // fondo
      borderColor: 'rgba(206, 52, 76,1)', // puntos
      pointBackgroundColor: 'rgba(206, 52, 76,1)',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(206, 52, 76,0.8)' // línea
    },
    { // azul
      backgroundColor: 'rgba(52, 136, 206,0.2)',
      borderColor: 'rgba(52, 136, 206,1)',
      pointBackgroundColor: 'rgba(52, 136, 206,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 136, 206,1)'
    },
    { // grey
      backgroundColor: 'rgba(53, 59, 72, 0.2)',
      borderColor: '#353b48',
      pointBackgroundColor: '#353b48',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(53, 59, 72, 0.8)'
    },
    { // success => web
      backgroundColor: 'rgba(127, 143, 166, 0.2)', // fondo
      borderColor: '#7f8fa6', // puntos
      pointBackgroundColor: '#7f8fa6',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(127, 143, 166, 0.8)' // línea
    },
    { // PELIGRO
      backgroundColor: 'rgba(232, 65, 24, 0)', // fondo
      borderColor: '#e84118', // puntos
      pointBackgroundColor: '#e84118',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(232, 65, 24, 0.8)' // línea
    },
    { // RAZONABLE
      backgroundColor: 'rgba(255, 193, 7, 0)', // fondo
      borderColor: '#ffc107', // puntos
      pointBackgroundColor: '#ffc107',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(255, 193, 7, 0.8)' // línea
    },
    { // MUY BUENO
      backgroundColor: 'rgba(76, 209, 55, 0)', // fondo
      borderColor: '#4cd137', // puntos
      pointBackgroundColor: '#4cd137',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(76, 209, 55, 0.8)' // línea
    }
  ];

  label1: any;
  label2: any;
  label3: any;
  label4: any;

  qh89: number = 0;
  qh910: number = 0;
  qh1011: number = 0;
  qh1112: number = 0;
  qh1213: number = 0;
  qh1314: number = 0;
  qh1415: number = 0;
  qh1516: number = 0;
  qh1617: number = 0;
  qh1718: number = 0;
  qh1819: number = 0;
  qh1920: number = 0;

  th89: number = 0;
  th910: number = 0;
  th1011: number = 0;
  th1112: number = 0;
  th1213: number = 0;
  th1314: number = 0;
  th1415: number = 0;
  th1516: number = 0;
  th1617: number = 0;
  th1718: number = 0;
  th1819: number = 0;
  th1920: number = 0;

  fh89: number = 0;
  fh910: number = 0;
  fh1011: number = 0;
  fh1112: number = 0;
  fh1213: number = 0;
  fh1314: number = 0;
  fh1415: number = 0;
  fh1516: number = 0;
  fh1617: number = 0;
  fh1718: number = 0;
  fh1819: number = 0;
  fh1920: number = 0;

  wh89: number = 0;
  wh910: number = 0;
  wh1011: number = 0;
  wh1112: number = 0;
  wh1213: number = 0;
  wh1314: number = 0;
  wh1415: number = 0;
  wh1516: number = 0;
  wh1617: number = 0;
  wh1718: number = 0;
  wh1819: number = 0;
  wh1920: number = 0;

  timeLine: Subscription;
  intervalo: any;

  constructor(
    private _timeLine: TimeLineService,
    private _selectFechaService: SlectFechaService
  ) {}

  ngOnInit() {
    // Obtener fecha para hacer consultas
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        this.fechaEmit = fechaEmiter.fecha;

        // Obtener totales
        this.obtenerTiempo(fechaEmiter.fecha);

        if (fechaEmiter.emitido) {
          // Intervalo por Bajar
          this.timeLine.unsubscribe();
          clearInterval(this.intervalo);
        } else {
          // Inicia Observable si la fecha es igual seleccionada
          this.qh89 = 0;
          this.qh910 = 0;
          this.qh1011 = 0;
          this.qh1112 = 0;
          this.qh1213 = 0;
          this.qh1314 = 0;
          this.qh1415 = 0;
          this.qh1516 = 0;
          this.qh1617 = 0;
          this.qh1718 = 0;
          this.qh1819 = 0;
          this.qh1920 = 0;

          this.th89 = 0;
          this.th910 = 0;
          this.th1011 = 0;
          this.th1112 = 0;
          this.th1213 = 0;
          this.th1314 = 0;
          this.th1415 = 0;
          this.th1516 = 0;
          this.th1617 = 0;
          this.th1718 = 0;
          this.th1819 = 0;
          this.th1920 = 0;

          this.fh89 = 0;
          this.fh910 = 0;
          this.fh1011 = 0;
          this.fh1112 = 0;
          this.fh1213 = 0;
          this.fh1314 = 0;
          this.fh1415 = 0;
          this.fh1516 = 0;
          this.fh1617 = 0;
          this.fh1718 = 0;
          this.fh1819 = 0;
          this.fh1920 = 0;

          this.wh89 = 0;
          this.wh910 = 0;
          this.wh1011 = 0;
          this.wh1112 = 0;
          this.wh1213 = 0;
          this.wh1314 = 0;
          this.wh1415 = 0;
          this.wh1516 = 0;
          this.wh1617 = 0;
          this.wh1718 = 0;
          this.wh1819 = 0;
          this.wh1920 = 0;
          this.lineChartData = [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT QRO'},
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT TX'},
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'FACTURADOS'},
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'WEB'},
            {data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35], label: 'PELIGRO'},
            {data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], label: 'RAZONABLE'},
            {data: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55], label: 'MUY BUENO'}
          ];
          this.observarTiempo();
        }
      });

  }

  observarTiempo() {
    // Subscripción
    this.timeLine = this.regresaObservable()
      .subscribe(
        info => {
          for (let i = 0; i < info.length; i++) {
            if (info[i].tipo === 'COT QRO') {
              this.label1 = info[i].tipo;
              if (info[i].hora === 8 && info[i].hora === 7 && info[i].hora === 6) {
                this.qh89 += info[i].cantidad;
              }
              if (info[i].hora === 9) {
                this.qh910 = info[i].cantidad;
              }
              if (info[i].hora === 10) {
                this.qh1011 = info[i].cantidad;
              }
              if (info[i].hora === 11) {
                this.qh1112 = info[i].cantidad;
              }
              if (info[i].hora === 12) {
                this.qh1213 = info[i].cantidad;
              }
              if (info[i].hora === 13) {
                this.qh1314 = info[i].cantidad;
              }
              if (info[i].hora === 14) {
                this.qh1415 = info[i].cantidad;
              }
              if (info[i].hora === 15) {
                this.qh1516 = info[i].cantidad;
              }
              if (info[i].hora === 16) {
                this.qh1617 = info[i].cantidad;
              }
              if (info[i].hora === 17) {
                this.qh1718 = info[i].cantidad;
              }
              if (info[i].hora === 18) {
                this.qh1819 = info[i].cantidad;
              }
              if (info[i].hora === 19) {
                this.qh1920 = info[i].cantidad;
              }
            }

            if (info[i].tipo === 'COT TX') {
              this.label2 = info[i].tipo;
              if (info[i].hora === 8 && info[i].hora === 7 && info[i].hora === 6) {
                this.th89 += info[i].cantidad;
              }
              if (info[i].hora === 9) {
                this.th910 = info[i].cantidad;
              }
              if (info[i].hora === 10) {
                this.th1011 = info[i].cantidad;
              }
              if (info[i].hora === 11) {
                this.th1112 = info[i].cantidad;
              }
              if (info[i].hora === 12) {
                this.th1213 = info[i].cantidad;
              }
              if (info[i].hora === 13) {
                this.th1314 = info[i].cantidad;
              }
              if (info[i].hora === 14) {
                this.th1415 = info[i].cantidad;
              }
              if (info[i].hora === 15) {
                this.th1516 = info[i].cantidad;
              }
              if (info[i].hora === 16) {
                this.th1617 = info[i].cantidad;
              }
              if (info[i].hora === 17) {
                this.th1718 = info[i].cantidad;
              }
              if (info[i].hora === 18) {
                this.th1819 = info[i].cantidad;
              }
              if (info[i].hora === 19) {
                this.th1920 = info[i].cantidad;
              }
            }

            if (info[i].tipo === 'FACTURADOS') {
              this.label3 = info[i].tipo;
              if (info[i].hora === 8 && info[i].hora === 7 && info[i].hora === 6) {
                this.fh89 += info[i].cantidad;
              }
              if (info[i].hora === 9) {
                this.fh910 = info[i].cantidad;
              }
              if (info[i].hora === 10) {
                this.fh1011 = info[i].cantidad;
              }
              if (info[i].hora === 11) {
                this.fh1112 = info[i].cantidad;
              }
              if (info[i].hora === 12) {
                this.fh1213 = info[i].cantidad;
              }
              if (info[i].hora === 13) {
                this.fh1314 = info[i].cantidad;
              }
              if (info[i].hora === 14) {
                this.fh1415 = info[i].cantidad;
              }
              if (info[i].hora === 15) {
                this.fh1516 = info[i].cantidad;
              }
              if (info[i].hora === 16) {
                this.fh1617 = info[i].cantidad;
              }
              if (info[i].hora === 17) {
                this.fh1718 = info[i].cantidad;
              }
              if (info[i].hora === 18) {
                this.fh1819 = info[i].cantidad;
              }
              if (info[i].hora === 19) {
                this.fh1920 = info[i].cantidad;
              }
            }

            if (info[i].tipo === 'WEB') {
              this.label4 = info[i].tipo;
              if (info[i].hora === 8 && info[i].hora === 7 && info[i].hora === 6) {
                this.wh89 += info[i].cantidad;
              }
              if (info[i].hora === 9) {
                this.wh910 = info[i].cantidad;
              }
              if (info[i].hora === 10) {
                this.wh1011 = info[i].cantidad;
              }
              if (info[i].hora === 11) {
                this.wh1112 = info[i].cantidad;
              }
              if (info[i].hora === 12) {
                this.wh1213 = info[i].cantidad;
              }
              if (info[i].hora === 13) {
                this.wh1314 = info[i].cantidad;
              }
              if (info[i].hora === 14) {
                this.wh1415 = info[i].cantidad;
              }
              if (info[i].hora === 15) {
                this.wh1516 = info[i].cantidad;
              }
              if (info[i].hora === 16) {
                this.wh1617 = info[i].cantidad;
              }
              if (info[i].hora === 17) {
                this.wh1718 = info[i].cantidad;
              }
              if (info[i].hora === 18) {
                this.wh1819 = info[i].cantidad;
              }
              if (info[i].hora === 19) {
                this.wh1920 = info[i].cantidad;
              }
            }
          }
          this.lineChartData = [
            {data: [this.qh89, this.qh910, this.qh1011, this.qh1112, this.qh1213, this.qh1314, this.qh1415, this.qh1516, this.qh1617, this.qh1718, this.qh1819, this.qh1920], label: this.label1},
            {data: [this.th89, this.th910, this.th1011, this.th1112, this.th1213, this.th1314, this.th1415, this.th1516, this.th1617, this.th1718, this.th1819, this.th1920], label: this.label2},
            {data: [this.fh89, this.fh910, this.fh1011, this.fh1112, this.fh1213, this.fh1314, this.fh1415, this.fh1516, this.fh1617, this.fh1718, this.fh1819, this.fh1920], label: this.label3},
            {data: [this.wh89, this.wh910, this.wh1011, this.wh1112, this.wh1213, this.wh1314, this.wh1415, this.wh1516, this.wh1617, this.wh1718, this.wh1819, this.wh1920], label: this.label4},
            {data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35], label: 'PELIGRO'},
            {data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], label: 'RAZONABLE'},
            {data: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55], label: 'MUY BUENO'}
          ];
        },
        error => console.log('Error en el observable: ', error),
        () => console.log('Termina Línea de Tiempo.')
      );
  }

  obtenerTiempo(fecha: string) {
    this._timeLine.linea(fecha).subscribe(( info: any ) => {
      for (let i = 0; i < info.length; i++) {
        if (info[i].tipo === 'COT QRO') {
          this.label1 = info[i].tipo;
          if (info[i].hora === 8 || info[i].hora === 7 || info[i].hora === 6) {
            this.qh89 += info[i].cantidad;
          }
          if (info[i].hora === 9) {
            this.qh910 = info[i].cantidad;
          }
          if (info[i].hora === 10) {
            this.qh1011 = info[i].cantidad;
          }
          if (info[i].hora === 11) {
            this.qh1112 = info[i].cantidad;
          }
          if (info[i].hora === 12) {
            this.qh1213 = info[i].cantidad;
          }
          if (info[i].hora === 13) {
            this.qh1314 = info[i].cantidad;
          }
          if (info[i].hora === 14) {
            this.qh1415 = info[i].cantidad;
          }
          if (info[i].hora === 15) {
            this.qh1516 = info[i].cantidad;
          }
          if (info[i].hora === 16) {
            this.qh1617 = info[i].cantidad;
          }
          if (info[i].hora === 17) {
            this.qh1718 = info[i].cantidad;
          }
          if (info[i].hora === 18) {
            this.qh1819 = info[i].cantidad;
          }
          if (info[i].hora === 19) {
            this.qh1920 = info[i].cantidad;
          }
        }

        if (info[i].tipo === 'COT TX') {
          this.label2 = info[i].tipo;
          if (info[i].hora === 8 || info[i].hora === 7 || info[i].hora === 6) {
            this.th89 += info[i].cantidad;
          }
          if (info[i].hora === 9) {
            this.th910 = info[i].cantidad;
          }
          if (info[i].hora === 10) {
            this.th1011 = info[i].cantidad;
          }
          if (info[i].hora === 11) {
            this.th1112 = info[i].cantidad;
          }
          if (info[i].hora === 12) {
            this.th1213 = info[i].cantidad;
          }
          if (info[i].hora === 13) {
            this.th1314 = info[i].cantidad;
          }
          if (info[i].hora === 14) {
            this.th1415 = info[i].cantidad;
          }
          if (info[i].hora === 15) {
            this.th1516 = info[i].cantidad;
          }
          if (info[i].hora === 16) {
            this.th1617 = info[i].cantidad;
          }
          if (info[i].hora === 17) {
            this.th1718 = info[i].cantidad;
          }
          if (info[i].hora === 18) {
            this.th1819 = info[i].cantidad;
          }
          if (info[i].hora === 19) {
            this.th1920 = info[i].cantidad;
          }
        }

        if (info[i].tipo === 'FACTURADOS') {
          this.label3 = info[i].tipo;
          if (info[i].hora === 8 || info[i].hora === 7 || info[i].hora === 6) {
            this.fh89 += info[i].cantidad;
          }
          if (info[i].hora === 9) {
            this.fh910 = info[i].cantidad;
          }
          if (info[i].hora === 10) {
            this.fh1011 = info[i].cantidad;
          }
          if (info[i].hora === 11) {
            this.fh1112 = info[i].cantidad;
          }
          if (info[i].hora === 12) {
            this.fh1213 = info[i].cantidad;
          }
          if (info[i].hora === 13) {
            this.fh1314 = info[i].cantidad;
          }
          if (info[i].hora === 14) {
            this.fh1415 = info[i].cantidad;
          }
          if (info[i].hora === 15) {
            this.fh1516 = info[i].cantidad;
          }
          if (info[i].hora === 16) {
            this.fh1617 = info[i].cantidad;
          }
          if (info[i].hora === 17) {
            this.fh1718 = info[i].cantidad;
          }
          if (info[i].hora === 18) {
            this.fh1819 = info[i].cantidad;
          }
          if (info[i].hora === 19) {
            this.fh1920 = info[i].cantidad;
          }
        }

        if (info[i].tipo === 'WEB') {
          this.label4 = info[i].tipo;
          if (info[i].hora === 8 && info[i].hora === 7 && info[i].hora === 6) {
            this.wh89 += info[i].cantidad;
          }
          if (info[i].hora === 9) {
            this.wh910 = info[i].cantidad;
          }
          if (info[i].hora === 10) {
            this.wh1011 = info[i].cantidad;
          }
          if (info[i].hora === 11) {
            this.wh1112 = info[i].cantidad;
          }
          if (info[i].hora === 12) {
            this.wh1213 = info[i].cantidad;
          }
          if (info[i].hora === 13) {
            this.wh1314 = info[i].cantidad;
          }
          if (info[i].hora === 14) {
            this.wh1415 = info[i].cantidad;
          }
          if (info[i].hora === 15) {
            this.wh1516 = info[i].cantidad;
          }
          if (info[i].hora === 16) {
            this.wh1617 = info[i].cantidad;
          }
          if (info[i].hora === 17) {
            this.wh1718 = info[i].cantidad;
          }
          if (info[i].hora === 18) {
            this.wh1819 = info[i].cantidad;
          }
          if (info[i].hora === 19) {
            this.wh1920 = info[i].cantidad;
          }
        }
      }
      this.lineChartData = [
        {data: [this.qh89, this.qh910, this.qh1011, this.qh1112, this.qh1213, this.qh1314, this.qh1415, this.qh1516, this.qh1617, this.qh1718, this.qh1819, this.qh1920], label: this.label1},
        {data: [this.th89, this.th910, this.th1011, this.th1112, this.th1213, this.th1314, this.th1415, this.th1516, this.th1617, this.th1718, this.th1819, this.th1920], label: this.label2},
        {data: [this.fh89, this.fh910, this.fh1011, this.fh1112, this.fh1213, this.fh1314, this.fh1415, this.fh1516, this.fh1617, this.fh1718, this.fh1819, this.fh1920], label: this.label3},
        {data: [this.wh89, this.wh910, this.wh1011, this.wh1112, this.wh1213, this.wh1314, this.wh1415, this.wh1516, this.wh1617, this.wh1718, this.wh1819, this.wh1920], label: this.label4},
        {data: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35], label: 'PELIGRO'},
        {data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], label: 'RAZONABLE'},
        {data: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55], label: 'MUY BUENO'}
      ];
    });
  }

  ngOnDestroy() {
    this.timeLine.unsubscribe();
    clearInterval(this.intervalo);
  }

  regresaObservable(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {

      this.intervalo = setInterval(() => {

        this._timeLine.linea(this.fechaEmit).subscribe(( data: any ) => {
          observer.next(data);
        });

      }, 10000);

    })
    .retry();
  }

}
