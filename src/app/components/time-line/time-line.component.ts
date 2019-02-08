import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeLineService } from '../../services/services.index';

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

  hora: any;

  // Gráfica
  lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT QRO'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'COT TX'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'FACTURADOS'}
  ];

  lineChartLabels: Array<any> = ['8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20'];
  lineChartOptions: any = {
    responsive: true
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
      backgroundColor: 'rgba(101, 106, 102,0.2)',
      borderColor: 'rgba(101, 106, 102,1)',
      pointBackgroundColor: 'rgba(101, 106, 102,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(101, 106, 102,0.8)'
    }
  ];

  label1: any;
  label2: any;
  label3: any;

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

  timeLine: Subscription;
  intervalo: any;

  constructor(
    private _timeLine: TimeLineService
  ) {

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
          }
          this.lineChartData = [
            {data: [this.qh89, this.qh910, this.qh1011, this.qh1112, this.qh1213, this.qh1314, this.qh1415, this.qh1516, this.qh1617, this.qh1718, this.qh1819, this.qh1920], label: this.label1},
            {data: [this.th89, this.th910, this.th1011, this.th1112, this.th1213, this.th1314, this.th1415, this.th1516, this.th1617, this.th1718, this.th1819, this.th1920], label: this.label2},
            {data: [this.fh89, this.fh910, this.fh1011, this.fh1112, this.fh1213, this.fh1314, this.fh1415, this.fh1516, this.fh1617, this.fh1718, this.fh1819, this.fh1920], label: this.label3}
          ];
        },
        error => console.log('Error en el observable: ', error),
        () => console.log('Termina Línea de Tiempo.')
      );

  }

  ngOnDestroy() {
    this.timeLine.unsubscribe();
    clearInterval(this.intervalo);
  }

  regresaObservable(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {

      this.intervalo = setInterval(() => {

        this._timeLine.linea().subscribe(( data: any ) => {
          observer.next(data);
        });

        // Facturados
        // this._timeLine.hora('01', '09')
        //   .subscribe( data => {
        //     this.fh89 = data[0].cantidad;
        //   });

        // this._timeLine.hora('09', '10')
        //   .subscribe( data => {
        //     this.fh910 = data[0].cantidad;
        //   });

        // this._timeLine.hora('10', '11')
        //   .subscribe( data => {
        //     this.fh1011 = data[0].cantidad;
        //   });

        // this._timeLine.hora('11', '12')
        //   .subscribe( data => {
        //     this.fh1112 = data[0].cantidad;
        //   });

        // this._timeLine.hora('12', '13')
        //   .subscribe( data => {
        //     this.fh1213 = data[0].cantidad;
        //   });

        // this._timeLine.hora('13', '14')
        //   .subscribe( data => {
        //     this.fh1314 = data[0].cantidad;
        //   });

        // this._timeLine.hora('14', '15')
        //   .subscribe( data => {
        //     this.fh1415 = data[0].cantidad;
        //   });

        // this._timeLine.hora('15', '16')
        //   .subscribe( data => {
        //     this.fh1516 = data[0].cantidad;
        //   });
        // this._timeLine.hora('16', '17')
        //   .subscribe( data => {
        //     this.fh1617 = data[0].cantidad;
        //   });
        // this._timeLine.hora('17', '18')
        //   .subscribe( data => {
        //     this.fh1718 = data[0].cantidad;
        //   });
        // this._timeLine.hora('18', '19')
        //   .subscribe( data => {
        //     this.fh1819 = data[0].cantidad;
        //   });
        // this._timeLine.hora(19, 20)
        //   .subscribe( data => {
        //     this.fh1920 = data[0].cantidad;
        //   });

        // Querétaro
        // this._timeLine.hora('01', '09', 2)
        //   .subscribe( data => {
        //     this.qh89 = data[0].cantidad;
        //   });

        // this._timeLine.hora('09', '10', 2)
        //   .subscribe( data => {
        //     this.qh910 = data[0].cantidad;
        //   });

        // this._timeLine.hora('10', '11', 2)
        //   .subscribe( data => {
        //     this.qh1011 = data[0].cantidad;
        //   });

        // this._timeLine.hora('11', '12', 2)
        //   .subscribe( data => {
        //     this.qh1112 = data[0].cantidad;
        //   });

        // this._timeLine.hora('12', '13', 2)
        //   .subscribe( data => {
        //     this.qh1213 = data[0].cantidad;
        //   });

        // this._timeLine.hora('13', '14', 2)
        //   .subscribe( data => {
        //     this.qh1314 = data[0].cantidad;
        //   });

        // this._timeLine.hora('14', '15', 2)
        //   .subscribe( data => {
        //     this.qh1415 = data[0].cantidad;
        //   });

        // this._timeLine.hora('15', '16', 2)
        //   .subscribe( data => {
        //     this.qh1516 = data[0].cantidad;
        //   });
        // this._timeLine.hora('16', '17', 2)
        //   .subscribe( data => {
        //     this.qh1617 = data[0].cantidad;
        //   });
        // this._timeLine.hora('17', '18', 2)
        //   .subscribe( data => {
        //     this.qh1718 = data[0].cantidad;
        //   });
        // this._timeLine.hora('18', '19', 2)
        //   .subscribe( data => {
        //     this.qh1819 = data[0].cantidad;
        //   });
        // this._timeLine.hora('19', '20', 2)
        //   .subscribe( data => {
        //     this.qh1920 = data[0].cantidad;
        //   });

        // Tequisquiapan
        // this._timeLine.hora('01', '09', 1)
        //   .subscribe( data => {
        //     this.th89 = data[0].cantidad;
        //   });

        // this._timeLine.hora('09', '10', 1)
        //   .subscribe( data => {
        //     this.th910 = data[0].cantidad;
        //   });

        // this._timeLine.hora('10', '11', 1)
        //   .subscribe( data => {
        //     this.th1011 = data[0].cantidad;
        //   });

        // this._timeLine.hora('11', '12', 1)
        //   .subscribe( data => {
        //     this.th1112 = data[0].cantidad;
        //   });

        // this._timeLine.hora('12', '13', 1)
        //   .subscribe( data => {
        //     this.th1213 = data[0].cantidad;
        //   });

        // this._timeLine.hora('13', '14', 1)
        //   .subscribe( data => {
        //     this.th1314 = data[0].cantidad;
        //   });

        // this._timeLine.hora('14', '15', 1)
        //   .subscribe( data => {
        //     this.th1415 = data[0].cantidad;
        //   });

        // this._timeLine.hora('15', '16', 1)
        //   .subscribe( data => {
        //     this.th1516 = data[0].cantidad;
        //   });
        // this._timeLine.hora('16', '17', 1)
        //   .subscribe( data => {
        //     this.th1617 = data[0].cantidad;
        //   });
        // this._timeLine.hora('17', '18', 1)
        //   .subscribe( data => {
        //     this.th1718 = data[0].cantidad;
        //   });
        // this._timeLine.hora('18', '19', 1)
        //   .subscribe( data => {
        //     this.th1819 = data[0].cantidad;
        //   });
        // this._timeLine.hora('19', '20', 1)
        //   .subscribe( data => {
        //     this.th1920 = data[0].cantidad;
        //   });

      }, 10000);

    })
    .retry();
  }

  ngOnInit() {
    this._timeLine.linea().subscribe(( info: any ) => {
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
          console.log(info[i]);
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
      }
      this.lineChartData = [
        {data: [this.qh89, this.qh910, this.qh1011, this.qh1112, this.qh1213, this.qh1314, this.qh1415, this.qh1516, this.qh1617, this.qh1718, this.qh1819, this.qh1920], label: this.label1},
        {data: [this.th89, this.th910, this.th1011, this.th1112, this.th1213, this.th1314, this.th1415, this.th1516, this.th1617, this.th1718, this.th1819, this.th1920], label: this.label2},
        {data: [this.fh89, this.fh910, this.fh1011, this.fh1112, this.fh1213, this.fh1314, this.fh1415, this.fh1516, this.fh1617, this.fh1718, this.fh1819, this.fh1920], label: this.label3}
      ];
    });

    // // Pedidos de 8 a 9 Total
    // this._timeLine.hora('01', '09')
    //   .subscribe( ( data ) => {
    //     this.fh89 = data[0].cantidad;
    //   });

    // this._timeLine.hora('01', '09', 2)
    //   .subscribe( ( data ) => {
    //     this.qh89 = data[0].cantidad;
    //   });

    // this._timeLine.hora('01', '09', 1)
    //   .subscribe( ( data ) => {
    //     this.th89 = data[0].cantidad;
    //   });

    // // Pedidos de 9 a 10 Total
    // this._timeLine.hora('09', '10')
    //   .subscribe( ( data ) => {
    //     this.fh910 = data[0].cantidad;
    //   });

    // this._timeLine.hora('09', '10', 2)
    //   .subscribe( ( data ) => {
    //     this.qh910 = data[0].cantidad;
    //   });

    // this._timeLine.hora('09', '10', 1)
    //   .subscribe( ( data ) => {
    //     this.th910 = data[0].cantidad;
    //   });

    // // Pedidos de 10 a 11 Total
    // this._timeLine.hora('10', '11')
    //   .subscribe( ( data ) => {
    //     this.fh1011 = data[0].cantidad;
    //   });

    // this._timeLine.hora('10', '11', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1011 = data[0].cantidad;
    //   });

    // this._timeLine.hora('10', '11', 1)
    //   .subscribe( ( data ) => {
    //     this.th1011 = data[0].cantidad;
    //   });

    // // Pedidos de 11 a 12 Total
    // this._timeLine.hora('11', '12')
    //   .subscribe( ( data ) => {
    //     this.fh1112 = data[0].cantidad;
    //   });

    // this._timeLine.hora('11', '12', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1112 = data[0].cantidad;
    //   });

    // this._timeLine.hora('11', '12', 1)
    //   .subscribe( ( data ) => {
    //     this.th1112 = data[0].cantidad;
    //   });

    // // Pedidos de 12 a 13 Total
    // this._timeLine.hora('12', '13')
    //   .subscribe( ( data ) => {
    //     this.fh1213 = data[0].cantidad;
    //   });

    // this._timeLine.hora('12', '13', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1213 = data[0].cantidad;
    //   });

    // this._timeLine.hora('12', '13', 1)
    //   .subscribe( ( data ) => {
    //     this.th1213 = data[0].cantidad;
    //   });

    // // Pedidos de 13 a 14 Total
    // this._timeLine.hora('13', '14')
    //   .subscribe( ( data ) => {
    //     this.fh1314 = data[0].cantidad;
    //   });

    // this._timeLine.hora('13', '14', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1314 = data[0].cantidad;
    //   });

    // this._timeLine.hora('13', '14', 1)
    //   .subscribe( ( data ) => {
    //     this.th1314 = data[0].cantidad;
    //   });

    // // Pedidos de 14 a 15 Total
    // this._timeLine.hora('14', 15)
    //   .subscribe( ( data ) => {
    //     this.fh1415 = data[0].cantidad;
    //   });

    // this._timeLine.hora('14', '15', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1415 = data[0].cantidad;
    //   });

    // this._timeLine.hora('14', '15', 1)
    //   .subscribe( ( data ) => {
    //     this.th1415 = data[0].cantidad;
    //   });

    // // Pedidos de 15 a 16 Total
    // this._timeLine.hora('15', '16')
    //   .subscribe( ( data ) => {
    //     this.fh1516 = data[0].cantidad;
    //   });

    // this._timeLine.hora('15', '16', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1516 = data[0].cantidad;
    //   });

    // this._timeLine.hora('15', '16', 1)
    //   .subscribe( ( data ) => {
    //     this.th1516 = data[0].cantidad;
    //   });

    // // Pedidos de 16 a 17 Total
    // this._timeLine.hora('16', '17')
    //   .subscribe( ( data ) => {
    //     this.fh1617 = data[0].cantidad;
    //   });

    // this._timeLine.hora('16', '17', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1617 = data[0].cantidad;
    //   });

    // this._timeLine.hora('16', '17', 1)
    //   .subscribe( ( data ) => {
    //     this.th1617 = data[0].cantidad;
    //   });

    // // Pedidos de 17 a 18 Total
    // this._timeLine.hora('17', '18')
    //   .subscribe( ( data ) => {
    //     this.fh1718 = data[0].cantidad;
    //   });

    // this._timeLine.hora('17', '18', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1718 = data[0].cantidad;
    //   });

    // this._timeLine.hora('17', '18', 1)
    //   .subscribe( ( data ) => {
    //     this.th1718 = data[0].cantidad;
    //   });

    // // Pedidos de 18 a 19 Total
    // this._timeLine.hora('18', '19')
    //   .subscribe( ( data ) => {
    //     this.fh1819 = data[0].cantidad;
    //   });

    // this._timeLine.hora('18', '19', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1819 = data[0].cantidad;
    //   });

    // this._timeLine.hora('18', '19', 1)
    //   .subscribe( ( data ) => {
    //     this.th1819 = data[0].cantidad;
    //   });

    // // Pedidos de 19 a 20 Total
    // this._timeLine.hora('19', '20')
    //   .subscribe( ( data ) => {
    //     this.fh1920 = data[0].cantidad;
    //   });

    // this._timeLine.hora('19', '20', 2)
    //   .subscribe( ( data ) => {
    //     this.qh1920 = data[0].cantidad;
    //   });

    // this._timeLine.hora('19', '20', 1)
    //   .subscribe( ( data ) => {
    //     this.th1920 = data[0].cantidad;
    //   });

  }

}
