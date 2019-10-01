import { Component, OnInit } from '@angular/core';

// Servicios
import { SlectFechaService, PanelService } from '../services/services.index';

@Component({
  selector: 'app-cobranza',
  templateUrl: './cobranza.component.html',
  styles: []
})
export class CobranzaComponent implements OnInit {

  fechaEmit: any;

  numCol1: number = 12;
  numCol2: number = 4;

  totalCobranzaCartera: number = 0;
  totalColectado: number = 0;

  saldovtahoy_tot1: number = 0;
  totalCobranzaCartera1: number = 0;
  totalColectado1: number = 0;
  totalCliCob1: number = 0;
  totalSaldoCob1: number = 0;
  totalCobrado1: number = 0;
  cli_dia_vencida1: number = 0;
  cart_dia_vencida1: number = 0;
  cob_dia_vencida1: number = 0;
  cart_dia_no_vencida1: number = 0;
  cob_dia_no_vencida1: number = 0;
  saldo_dia_no_vencida1: number = 0;

  saldovtahoy_tot2: number = 0;
  totalCobranzaCartera2: number = 0;
  totalColectado2: number = 0;
  totalCliCob2: number = 0;
  totalSaldoCob2: number = 0;
  totalCobrado2: number = 0;
  cli_dia_vencida2: number = 0;
  cart_dia_vencida2: number = 0;
  cob_dia_vencida2: number = 0;
  cart_dia_no_vencida2: number = 0;
  cob_dia_no_vencida2: number = 0;
  saldo_dia_no_vencida2: number = 0;

  totalDetalle: number = 0;
  id: number = 0;

  zona1: any[] = [];
  zona2: any[] = [];
  folios: any[] = [];
  detalles: any[] = [];
  pagos: any[] = [];
  nombre: any = '';

  mostrarDetalleFolio: boolean = false;

  constructor(
    private panelService: PanelService,
    private _selectFechaService: SlectFechaService
  ) { }

  ngOnInit() {
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        this.fechaEmit = fechaEmiter.fecha;
        // this.obtenerVencidos(fechaEmiter.fecha);
        this.zona1 = [];
        this.zona2 = [];
        this.cobranzaZona1(fechaEmiter.fecha);
        this.cobranzaZona2(fechaEmiter.fecha);
      });
  }

  cobranzaZona1(fecha: any) {
    this.panelService.cobranzaZona1(this.fechaEmit, 1).subscribe((zona1: any) => {
      if (zona1.length > 0) {
        this.saldovtahoy_tot1 = 0;
        this.totalCobranzaCartera1 = 0;
        this.totalColectado1 = 0;
        this.cart_dia_vencida1 = 0;
        this.cob_dia_vencida1 = 0;
        this.cart_dia_no_vencida1 = 0;
        this.cob_dia_no_vencida1 = 0;
        this.saldo_dia_no_vencida1 = 0;
        this.cli_dia_vencida1 = 0;
        this.zona1 = zona1;
        for (const zn of zona1) {
          this.saldovtahoy_tot1 += zn.SALDOVTAHOY_TOT;
          this.totalCobranzaCartera1 += zn.TOTAL;
          this.totalColectado1 += zn.COBRADO;
          this.cart_dia_vencida1 += zn.VENCIDO;
          this.cob_dia_vencida1 += zn.COB_VENC;
          this.cart_dia_no_vencida1 += zn.SANA;
          this.cob_dia_no_vencida1 += zn.COB_SANA;
          this.cli_dia_vencida1 += zn.CLIENTES_C_SALDO;
        }
      }
    });
  }

  cobranzaZona2(fecha: any) {
    this.panelService.cobranzaZona1(this.fechaEmit, 2).subscribe((zona2: any) => {
      if (zona2.length > 0) {
        this.saldovtahoy_tot2 = 0;
        this.totalCobranzaCartera2 = 0;
        this.totalColectado2 = 0;
        this.cart_dia_vencida2 = 0;
        this.cob_dia_vencida2 = 0;
        this.cart_dia_no_vencida2 = 0;
        this.cob_dia_no_vencida2 = 0;
        this.saldo_dia_no_vencida2 = 0;
        this.cli_dia_vencida2 = 0;
        this.zona2 = zona2;
        for (const zn of zona2) {
          this.saldovtahoy_tot2 += zn.SALDOVTAHOY_TOT;
          this.totalCobranzaCartera2 += zn.TOTAL;
          this.totalColectado2 += zn.COBRADO;
          this.cart_dia_vencida2 += zn.VENCIDO;
          this.cob_dia_vencida2 += zn.COB_VENC;
          this.cart_dia_no_vencida2 += zn.SANA;
          this.cob_dia_no_vencida2 += zn.COB_SANA;
          this.cli_dia_vencida2 += zn.CLIENTES_C_SALDO;
        }
      }
    });
  }

  obtenerVencidos(fecha: any) {
    this.zona1 = [];
    this.zona2 = [];
    this.cobranzaZona1(fecha);
    this.cobranzaZona2(fecha);
  }

  // obtenerVencidos(fecha: any) {
  //   this.panelService.resumenPedidosAsesor(fecha).subscribe((res: any) => {
  //     if (res.length > 0) {
  //       console.log(res);
  //       // this.asesores = [];
  //       this.totalCobranzaCartera1 = 0;
  //       this.totalColectado1 = 0;
  //       this.cart_dia_vencida1 = 0;
  //       this.cob_dia_vencida1 = 0;
  //       this.cart_dia_no_vencida1 = 0;
  //       this.cob_dia_no_vencida1 = 0;
  //       this.saldo_dia_no_vencida1 = 0;
  //       // this.totalCliCob = 0;
  //       // this.totalSaldoCob = 0;
  //       // this.totalCobrado = 0;
  //       for (const per of res) {
  //         this.panelService.obtenerCarteraTotalDia(per.PERID, fecha).subscribe((totalCart: any) => {
  //           this.totalCobranzaCartera1 += totalCart[0].SALDOFINAL_TOT;
  //           this.almacenar(per, totalCart[0]);
  //         });
  //         this.panelService.obtenerCarteraVencidaDia(per.PERID, fecha).subscribe((vencidos: any) => {
  //           this.cli_dia_vencida1 += vencidos[0].CLIENTES;
  //           this.cart_dia_vencida1 += vencidos[0].SALDOFINAL;
  //           this.almacenar(per, vencidos[0]);
  //         });
  //         this.panelService.obtenerPagosdelDia(per.PERID, fecha).subscribe((pagos: any) => {
  //           this.totalColectado1 += pagos[0].PAGADO;
  //           this.almacenar(per, pagos[0]);
  //         });
  //         this.panelService.obtenerCarteraSanaDia(per.PERID, fecha).subscribe((sanaD: any) => {
  //           this.cart_dia_no_vencida1 += sanaD[0].SALDOFINAL_SANOS;
  //           this.almacenar(per, sanaD[0]);
  //         });
  //         this.panelService.obtenerPagosdelDiaSanas(per.PERID, fecha).subscribe((sanaS: any) => {
  //           this.cob_dia_no_vencida1 += sanaS[0].PAGADO_SANAS;
  //           this.almacenar(per, sanaS[0]);
  //         });
  //         this.panelService.obtenerPagosdelDiaVencidas(per.PERID, fecha).subscribe((venc: any) => {
  //           this.cob_dia_vencida1 += venc[0].PAGADO_VENCIDO;
  //           this.almacenar(per, venc[0]);
  //         });
  //       }
  //     }
  //   });
  // }

  // almacenar(asesor: any, data: any) {
  //   const esAsesor = (asesorFind: any) => {
  //     return asesorFind.PERID === asesor.PERID;
  //   };

  //   if (!this.asesores.find(esAsesor)) {
  //     const objeto = {
  //       PERID: asesor.PERID,
  //       CATINV: asesor.CATINV,
  //       CLIENTES_DIA: asesor.CLIENTES_DIA,
  //       DIA_C_VTA: asesor.DIA_C_VTA,
  //       FALTA: asesor.FALTA,
  //       IMPORTE: asesor.IMPORTE,
  //       INDICE: asesor.INDICE,
  //       NOMBRE: asesor.NOMBRE.split(')')[1],
  //       PEDIDOS: asesor.PEDIDOS,
  //       CLIENTES_TOT: 0,
  //       CLIENTES_SANOS: 0,
  //       CLIENTES_C_SALDO: 0,
  //       VENCIDO: 0,
  //       COBRADO: data.PAGADO,
  //       TOTAL: 0,
  //       SANA: 0,
  //       COB_SANA: 0,
  //       COB_VENC: 0
  //     };
  //     this.asesores.push(objeto);
  //   } else {
  //     if (data.CLIENTES !== undefined) {
  //       this.asesores.find(esAsesor).CLIENTES_C_SALDO = data.CLIENTES;
  //     }
  //     if (data.SALDOFINAL !== undefined) {
  //       // this.totalCobranzaCartera += data.SALDOFINAL;
  //       this.asesores.find(esAsesor).VENCIDO = data.SALDOFINAL !== '' ? data.SALDOFINAL : 0;
  //     }
  //     if (data.SALDOFINAL_TOT !== undefined) {
  //       this.asesores.find(esAsesor).TOTAL = data.SALDOFINAL_TOT !== '' ? data.SALDOFINAL_TOT : 0;
  //       this.asesores.find(esAsesor).CLIENTES_TOT = data.CLIENTES_TOT !== '' ? data.CLIENTES_TOT : 0;
  //     }
  //     if (data.SALDOFINAL_SANOS !== undefined) {
  //       this.asesores.find(esAsesor).SANA = data.SALDOFINAL_SANOS !== '' ? data.SALDOFINAL_SANOS : 0;
  //       this.asesores.find(esAsesor).CLIENTES_SANOS = data.CLIENTES_SANOS !== '' ? data.CLIENTES_SANOS : 0;
  //     }
  //     if (data.PAGADO_SANAS !== undefined) {
  //       this.asesores.find(esAsesor).COB_SANA = data.PAGADO_SANAS !== '' ? data.PAGADO_SANAS : 0;
  //     }
  //     if (data.PAGADO_VENCIDO !== undefined) {
  //       this.asesores.find(esAsesor).COB_VENC = data.PAGADO_VENCIDO !== '' ? data.PAGADO_VENCIDO : 0;
  //     }
  //   }
  // }

  verAsesor(seccion: any) {
    this.nombre = '';
    this.folios = [];
    this.pagos = [];
    this.nombre = seccion.NOMBRE;
    this.numCol1 = 12;
    this.mostrarDetalleFolio = false;
    this.panelService.obtenerRemisionesVencidasDia(seccion.PERID, this.fechaEmit).subscribe((folios: any) => {
      if (folios.length > 0) {
        this.folios = folios;
      }
    });
    this.panelService.obtenerPagosDia(seccion.PERID, this.fechaEmit).subscribe((pagos: any) => {
      if (pagos.length > 0) {
        this.pagos = pagos;
      }
    });
  }

  verDetallesFolio(docid?: number) {
    if (this.numCol1 === 8 && docid === this.id) {
      this.numCol1 = 12;
      this.mostrarDetalleFolio = false;
      // id = 0;
    } else {
      this.id = docid;
      this.totalDetalle = 0;
      this.detalles = [];
      this.numCol1 = 8;
      this.mostrarDetalleFolio = true;
      this.panelService.obtenerDetallesDocid(docid).subscribe((detalle: any) => {
        if (detalle.length > 0) {
          this.detalles = detalle;
          for (const det of detalle) {
            this.totalDetalle += det.PAGADO;
          }
        }
      });
    }
  }

}
