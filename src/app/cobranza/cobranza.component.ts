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

  totalCobranzaCartera: number = 0;
  totalColectado: number = 0;
  totalCliCob: number = 0;
  totalSaldoCob: number = 0;
  totalCobrado: number = 0;
  asesores: any[] = [];
  folios: any[] = [];
  pagos: any[] = [];
  nombre: any = '';

  constructor(
    private panelService: PanelService,
    private _selectFechaService: SlectFechaService
  ) { }

  ngOnInit() {
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        this.fechaEmit = fechaEmiter.fecha;
        this.obtenerVencidos(fechaEmiter.fecha);
      });
  }

  obtenerVencidos(fecha: any) {
    this.panelService.resumenPedidosAsesor(fecha).subscribe((res: any) => {
      if (res.length > 0) {
        const array = [];
        this.asesores = [];
        this.totalCobranzaCartera = 0;
        this.totalColectado = 0;
        this.totalCliCob = 0;
        this.totalSaldoCob = 0;
        this.totalCobrado = 0;
        for (const per of res) {
          this.panelService.obtenerCarteraVencidaDia(per.PERID, fecha).subscribe((vencidos: any) => {
            this.totalCobranzaCartera += vencidos[0].SALDOFINAL;
            this.panelService.obtenerPagosdelDia(per.PERID, fecha).subscribe((pagos: any) => {
              if (pagos.length > 0) {
                this.totalColectado += pagos[0].PAGADO;
                this.totalCliCob += vencidos[0].SALDOFINAL;
                this.totalSaldoCob += vencidos[0].CLIENTES;
                this.totalCobrado += pagos[0].PAGADO;
                const objeto = {
                  PERID: per.PERID,
                  CATINV: per.CATINV,
                  CLIENTES_DIA: per.CLIENTES_DIA,
                  DIA_C_VTA: per.DIA_C_VTA,
                  FALTA: per.FALTA,
                  IMPORTE: per.IMPORTE,
                  INDICE: per.INDICE,
                  NOMBRE: per.NOMBRE.split(')')[1],
                  PEDIDOS: per.PEDIDOS,
                  CLIENTES_C_SALDO: vencidos[0].CLIENTES,
                  VENCIDO: vencidos[0].SALDOFINAL,
                  COBRADO: pagos[0].PAGADO
                };
                array.push(objeto);
              }
            });
          });
        }
        this.asesores = array;
      }
    });
  }

  verAsesor(seccion: any) {
    this.nombre = '';
    this.folios = [];
    this.pagos = [];
    this.nombre = seccion.NOMBRE;
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

}
