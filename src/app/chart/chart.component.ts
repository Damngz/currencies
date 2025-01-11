import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-chart',
  imports: [ NgApexchartsModule ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  series: ApexAxisChartSeries = [
    {
      name: "Desempeño",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
  ];

  chart: ApexChart = {
    type: 'area',
    foreColor: '#ffffff',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false
    }
  };

  xaxis: ApexXAxis = {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  };

  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  colors = [
    '#ff4991'
  ];

  fill: ApexFill = {
    type: "gradient",
    gradient: {
      shadeIntensity: 0,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0.2,
    }
  };
}
