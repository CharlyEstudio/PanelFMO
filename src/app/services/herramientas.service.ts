import { Injectable } from '@angular/core';

@Injectable()
export class HerramientasService {

  constructor() { }

  fechaActual() {
    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  fechaInicialMesActual() {
    let h = new Date();

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-01';
    return fecha;
  }

}
