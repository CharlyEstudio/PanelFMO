import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

// Servicios
import { SlectFechaService, HerramientasService } from '../../services/services.index';

@Component({
  selector: 'app-select-fecha',
  templateUrl: './select-fecha.component.html',
  styles: []
})
export class SelectFechaComponent implements OnInit {

  @ViewChild('fecha') fecha: ElementRef;

  constructor(
    private selectFechaService: SlectFechaService,
    private herramientas: HerramientasService
  ) {}

  ngOnInit() {
    const enviar = {
      fecha: this.herramientas.fechaActual(),
      emitido: false
    };
    this.selectFechaService.fecha.emit(enviar);
  }

  cambiarFecha() {
    let em;
    if (this.fecha.nativeElement.value === this.herramientas.fechaActual()) {
      em = false;
    } else {
      em = true;
    }
    const enviar = {
      fecha: this.fecha.nativeElement.value,
      emitido: em
    };
    this.selectFechaService.fecha.emit(enviar);
  }

}
