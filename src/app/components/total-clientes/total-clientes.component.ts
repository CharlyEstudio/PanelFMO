import { Component, OnInit } from '@angular/core';

// Servicios
import { PanelService, SlectFechaService } from '../../services/services.index';

@Component({
  selector: 'app-total-clientes',
  templateUrl: './total-clientes.component.html',
  styles: []
})
export class TotalClientesComponent implements OnInit {

  // Fecha Emit
  fechaEmit: string;

  zona1: any[] = [];
  zona2: any[] = [];

  constructor(
    private _panel: PanelService,
    private _selectFechaService: SlectFechaService
  ) { }

  ngOnInit() {
    // Obtener fecha para hacer consultas
    this._selectFechaService.fecha
      .subscribe((fechaEmiter: any) => {
        // console.log('Total Clientes: ', fechaEmiter);
      });
    this.z1();
    this.z2();
  }

  z1() {
    this.zona1 = [];
    this._panel.asesoresZona(this.fechaEmit, 1).subscribe((zo1: any) => {
      if (zo1.length > 0) {
        for (let i = 0; i < zo1.length; i++) {
          this._panel.totalClientesPedidos(zo1[i].perid, 'zona').subscribe((lista: any) => {
            const agregar = {
              perid: zo1[i].perid,
              nombre: zo1[i].nombre,
              clientesDia: zo1[i].clientes,
              clientesVta: lista.length
            };
            this.zona1.push(agregar);
          });
        }
      }
    });
  }

  z2() {
    this.zona2 = [];
    this._panel.asesoresZona(this.fechaEmit, 2).subscribe((zo2: any) => {
      if (zo2.length > 0) {
        for (let i = 0; i < zo2.length; i++) {
          this._panel.totalClientesPedidos(zo2[i].perid, 'zona').subscribe((lista: any) => {
            const agregar = {
              perid: zo2[i].perid,
              nombre: zo2[i].nombre,
              clientesDia: zo2[i].clientes,
              clientesVta: lista.length
            };
            this.zona2.push(agregar);
          });
        }
      }
    });
  }

}
