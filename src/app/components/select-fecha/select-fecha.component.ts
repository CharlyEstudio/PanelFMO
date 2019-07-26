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
    if (this.fecha.nativeElement.value === '') {
      this.selectFechaService.fecha.emit(this.herramientas.fechaActual());
    } else {
      this.selectFechaService.fecha.emit(this.fecha.nativeElement.value);
    }
  }

  cambiarFecha() {
    this.selectFechaService.fecha.emit(this.fecha.nativeElement.value);
  }

}
