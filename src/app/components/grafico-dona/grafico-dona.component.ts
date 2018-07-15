import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() dataGraficoDona ;

    public doughnutChartLabels: string[];
    public doughnutChartData: number[];
    public doughnutChartType: string;

  constructor() {
   console.log(this.dataGraficoDona);
    }

  ngOnInit() {

    this.doughnutChartLabels = this.dataGraficoDona.labels;
    this.doughnutChartData = this.dataGraficoDona.data;
    this.doughnutChartType = this.dataGraficoDona.type;
  }

}
