import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  // Doughnut
  @Input() ChartLabels: string [] = [];
  @Input() ChartData: number [] = [];
  @Input() ChartType: string [] = [];
  @Input() leyenda: string;

  porcentaje: number = 0;
  titulo: string = '';

  constructor() {}

  ngOnInit() {
  }

}
