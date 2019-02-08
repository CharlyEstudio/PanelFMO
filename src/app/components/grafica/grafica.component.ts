import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: []
})
export class GraficaComponent implements OnInit {

  @Input() lineChartColors: any [] = [];
  @Input() lineChartLabels: any [] = [];
  @Input() lineChartOptions: any [] = [];
  @Input() lineChartData: any[] = [];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor() { }

  ngOnInit() {
  }

}
