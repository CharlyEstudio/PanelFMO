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
    console.log(seccion.PERID, this.fechaEmit);
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
