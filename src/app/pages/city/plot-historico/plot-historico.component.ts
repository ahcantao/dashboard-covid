import {Component, Input, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-plot-historico',
  templateUrl: './plot-historico.component.html',
  styleUrls: ['./plot-historico.component.scss'],
})
export class PlotHistoricoComponent implements OnInit{

  @Input() days : Label[];
  @Input() label : string;
  @Input() data: string[];
  @Input() borderColor: string;
  @Input() backgroundColor: string;
  @Input() type: string;

  lineChartType;
  lineChartLabels: Label[];
  lineChartData: ChartDataSets[];
  public lineChartColors: Color[];

  ngOnInit() {
    this.lineChartLabels = this.days;
    this.lineChartData = this.getChartData(this.label, this.data);
    this.lineChartColors = this.getCharColors(this.borderColor, this.backgroundColor);
    this.lineChartType = this.type;
  }

  getChartData(_label, _data):ChartDataSets[] {
    return [
      { data: _data, label: _label }
    ]
  }

  getCharColors(_borderColor, _backgroundColor):Color[] {
    return [
      { // grey
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        pointBackgroundColor: this.borderColor,
        pointBorderColor: this.borderColor,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,.8)'
      },
      // { // dark grey
      //   backgroundColor: 'rgba(77,83,96,0.2)',
      //   borderColor: 'rgba(77,83,96,1)',
      //   pointBackgroundColor: 'rgba(77,83,96,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(77,83,96,1)'
      // },
      // { // red
      //   backgroundColor: 'rgba(255,0,0,0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      // }
    ];
  }








  lineChartOptions = {
    responsive: true,

    tooltips: {
      mode: 'nearest',

    },

    legend : {
      display: false,
      labels : {
        fontColor : '#ffffff'
      }
    },

    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#ccc',
        },
        gridLines: {
          display: false ,
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: '#ccc',
          // beginAtZero: true,
          // maxTicksLimit: 5,
          // stepSize: Math.ceil(250 / 5),
          // max: 250
        },
        gridLines: {
          display: true ,
          color: "#282e38",
          // borderDash: [1,1],
        },

      }]
    }
  };


  lineChartLegend = true;
  lineChartPlugins = [];


}
