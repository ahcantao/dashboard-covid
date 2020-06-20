import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  DoCheck, HostListener
} from '@angular/core';
import COUNTRY_CODES from "../../shared/utils/countries"

import {
  ActivatedRoute
} from "@angular/router";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_pt_BR from "@amcharts/amcharts4/lang/pt_BR";

import {
  GetdataService
} from "./../../core/services/getdata.service";
import {
  combineLatest
} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})


export class CityComponent implements OnInit, OnDestroy, DoCheck {
  private pieChart: am4charts.PieChart;
  private lineChart: am4charts.XYChart;
  private radarChart: am4charts.RadarChart

  public isLoading: boolean = true;

  public timeLine;

  public lastUpdate;
  public totalConfirmed=0;
  public totalDeaths=0;
  public totalRecoveries;
  public totalCritical=0;
  totalCured = 0;
  totalActive = 0;
  totalHospitalized = 0;
  todayCured = 0;
  todayActive = 0;
  todayHospitalized = 0;
  public todayConfirmed=0;
  public todayDeaths=0;
  public activeCases=0;
  public casesPer1M=0;
  public finishedCases=0;
  public totalNotified=0;
  public totalSuspect=0;
  public todayNotified=0;
  public todaySuspect=0;
  public todayTotalNotified=0;
  public todayTotalSuspect=0;
  public totalDiscarded = 0;
  public todayDiscarded = 0;
  public countryCodes = COUNTRY_CODES;
  public country: any;
  public translations : any = {};

  constructor(private route: ActivatedRoute, private _getDataService: GetdataService, private zone: NgZone, public translate : TranslateService) {}




  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.pieChart) {
        this.pieChart.dispose();
      }
      if (this.lineChart) {
        this.lineChart.dispose();
      }
      if (this.radarChart) {
        this.radarChart.dispose();
      }
    });
  }
  async ngDoCheck() {
    this.translate.get(['Shared.Other.14', 'Shared.Other.15', 'Shared.Other.16', 'Shared.Other.17', 'Shared.Other.21', 'Shared.Other.22', 'Shared.Other.23', 'Shared.Other.24', 'Shared.Other.25', 'Shared.Other.26', 'Shared.TopCards.1', 'Shared.TopCards.3', 'Shared.TopCards.4'])
    .subscribe(translations => {
      this.setTranslations(translations);
      return 0;
    });
  }

  ngOnInit() {
    // let nameTimeline = this.route.snapshot.paramMap.get("name");
    let nameTimeline = "Catanduva"
    this.zone.runOutsideAngular(() => {
      combineLatest(
        this._getDataService.getCity("Catanduva"),
        this._getDataService.getTimelineCity("Catanduva")
        )
        .subscribe(([getAllData, getTimelineData]) => {

          getAllData = getAllData[0];
          this.lastUpdate = getAllData['isoDate'];
          this.isLoading = false;
          this.country = getAllData["city"];

          this.totalConfirmed = getAllData["totalConfirmed"];
          this.totalDeaths = getAllData["totalDeath"];
          this.totalNotified = getAllData["totalNotified"];
          this.totalSuspect = getAllData["totalSuspect"];
          this.totalDiscarded = getAllData["totalDiscarded"];
          this.totalCured = getAllData["totalCured"];
          this.totalActive = getAllData["totalActive"];
          this.totalHospitalized = getAllData["totalHospitalized"];


          this.todayConfirmed = getAllData["todayTotalConfirmed"];
          this.todayDeaths = getAllData["todayTotalDeath"];
          this.todayNotified = getAllData["todayTotalNotified"];
          this.todaySuspect = getAllData["todayTotalSuspect"];
          this.todayDiscarded = getAllData["todayTotalDiscarded"];
          this.todayCured = getAllData["todayTotalCured"];
          this.todayActive = getAllData["todayTotalActive"];
          this.todayHospitalized = getAllData["todayTotalHospitalized"];


          // this.activeCases = getAllData["active"];
          this.casesPer1M = getAllData["casesPerOneMillion"];
          this.finishedCases = this.totalDeaths + this.totalRecoveries;
          this.timeLine = getTimelineData;

          this.loadPieChart();
          this.loadLineChart(false);
          this.loadLineChartToday(false);
          this.loadRadar();
        });
    });
  }

  loadLineChart(chartType) {
    let caseData = this.timeLine;
    let plotData = []

    caseData.forEach(async element => {


      plotData.push({
        date: element['isoDate'],
        cases: element['totalConfirmed'],
        deaths: element['totalDeath'],
        suspect: element['totalSuspect'],
        discarded: element['totalDiscarded'],
        active: element['totalActive'],
        cured: element['totalCured'],
        hospitalized: element['totalHospitalized']
      });

    });


    let first_day = plotData[6];
    let n_th_day = plotData[plotData.length-1];
    let total_days = plotData.length-7;
    let doubling_time = (total_days * Math.log(2)) / (Math.log(n_th_day['cases']/first_day['cases']));

    let last_5_days = plotData[plotData.length-6];
    let doubling_time_5_days = (5 * Math.log(2)) / (Math.log(n_th_day['cases']/last_5_days['cases']));

    console.log('Tempo para dobrar casos confirmados desde primeiro caso: ', doubling_time.toFixed(2) + ' dias');
    console.log('Tempo para dobrar casos confirmados nos últimos 5 dias: ', doubling_time_5_days.toFixed(2) + ' dias');






    let chart = am4core.create("lineChart", am4charts.XYChart);

    chart.numberFormatter.numberFormat = "#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];

    chart.language.locale = am4lang_pt_BR;
    chart.numberFormatter.language = new am4core.Language();
    chart.numberFormatter.language.locale = am4lang_pt_BR;
    chart.dateFormatter.language = new am4core.Language();
    chart.dateFormatter.language.locale = am4lang_pt_BR;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = chartType;

    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
    dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    chart = this.createSeriesLine(chart, "#21AFDD", "cases");
    chart = this.createSeriesLine(chart, "#ff5b5b", "deaths");
    chart = this.createSeriesLine(chart, "#f9c851", "suspect");
    chart = this.createSeriesLine(chart, "#fd7e14", "discarded");
    chart = this.createSeriesLine(chart, "#9c27b0", "active");
    chart = this.createSeriesLine(chart, "#fcfcfc", "cured");
    chart = this.createSeriesLine(chart, "#a36f40", "hospitalized");

    chart.data = plotData;

    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#adb5bd");

    chart.cursor = new am4charts.XYCursor();


    var update06_05 = dateAxis.axisRanges.create();
    update06_05.date = new Date("2020-05-06 12:00");
    update06_05.grid.stroke = am4core.color("#fd7e14");
    update06_05.grid.strokeWidth = 3;
    update06_05.grid.strokeOpacity = 0.5;
    // update06_05.grid.strokeDasharray = "8,4";
    update06_05.grid.tooltip = new am4core.Tooltip();
    update06_05.grid.tooltipText = "clique para informações";
    update06_05.grid.tooltipPosition = "pointer";

    update06_05.grid.events.on("hit", function(ev) {
      chart.modal.close();
      chart.openModal("A partir de 06/05/2020, a Prefeitura passou a divulgar o número de casos suspeitos e descartados como a soma de leves + graves, antes desta data era divulgado somente os casos graves.", "Informação");
    });


    var update07_05 = dateAxis.axisRanges.create();
    update07_05.date = new Date("2020-05-07 12:00");
    update07_05.grid.stroke = am4core.color("#f9c851");
    update07_05.grid.strokeWidth = 3;
    update07_05.grid.strokeOpacity = 0.5;
    // update07_05.grid.strokeDasharray = "8,4";
    update07_05.grid.tooltip = new am4core.Tooltip();
    update07_05.grid.tooltipText = "clique para informações";
    update07_05.grid.tooltipPosition = "pointer";

    update07_05.grid.events.on("hit", function(ev) {
      chart.modal.close();
      chart.openModal("A partir de 07/05/2020, as notificações de casos leves - sem coleta para exame - deixaram de ser contados como descartados e passaram a contar como suspeitos durante 14 dias.", "Informação");
    });




    this.lineChart = chart;
  }

  loadLineChartToday(chartType) {
    let caseData = this.timeLine;
    let plotData = []

    caseData.forEach(async element => {


      plotData.push({
        date: element['isoDate'],
        cases: element['todayTotalConfirmed'],
        deaths: element['todayTotalDeath'],
        suspect: element['todayTotalSuspect'],
        discarded: element['todayTotalDiscarded'],
        active: element['todayTotalActive'],
        cured: element['todayTotalCured'],
        hospitalized: element['todayTotalHospitalized']
      });

    });

    let chart = am4core.create("lineChartToday", am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];


    chart.language.locale = am4lang_pt_BR;
    chart.numberFormatter.language = new am4core.Language();
    chart.numberFormatter.language.locale = am4lang_pt_BR;
    chart.dateFormatter.language = new am4core.Language();
    chart.dateFormatter.language.locale = am4lang_pt_BR;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.logarithmic = chartType;

    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
    dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    chart = this.createSeriesLine(chart, "#21AFDD", "cases");
    chart = this.createSeriesLine(chart, "#ff5b5b", "deaths");
    chart = this.createSeriesLine(chart, "#f9c851", "suspect");
    chart = this.createSeriesLine(chart, "#fd7e14", "discarded");
    chart = this.createSeriesLine(chart, "#9c27b0", "active");
    chart = this.createSeriesLine(chart, "#fcfcfc", "cured");
    chart = this.createSeriesLine(chart, "#a36f40", "hospitalized");

    chart.data = plotData;

    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#adb5bd");

    chart.cursor = new am4charts.XYCursor();

    this.lineChart = chart;
  }



  loadPieChart() {
    let chart = am4core.create("pieChart", am4charts.PieChart);
    chart.data.push({
      type: 'Confirmados',
      number: this.totalConfirmed,
      "color": am4core.color("#21AFDD")
    });
    chart.data.push({
      type: 'Óbitos',
      number: this.totalDeaths,
      "color": am4core.color("#ff5b5b")
    });
    chart.data.push({
      type: 'Suspeitos',
      number: this.totalSuspect,
      "color": am4core.color("#f9c851")
    });

    chart.data.push({
      type: 'Descartados',
      number: this.totalDiscarded,
      "color": am4core.color("#fd7e14")
    });
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "type";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.stroke = am4core.color("#313a46");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    chart.legend = new am4charts.Legend();

    chart.legend.valueLabels.template.align="left";
    chart.legend.valueLabels.template.textAlign="start";

    chart.legend.valueLabels.template.fill = am4core.color("#f7f7f7");
    chart.legend.labels.template.fill = am4core.color("#f7f7f7");
    // chart.legend.labels.template.fontWeight = "bold";

    pieSeries.legendSettings.labelText = "[bold]{type} ({number})[/]:";
    this.pieChart = chart;
  }


  loadRadar() {
    let chart = am4core.create("radarChart", am4charts.RadarChart);

    // Add data
    chart.data = [{
      "category": this.translations.deaths,
      "value": this.totalDeaths / this.totalConfirmed * 100,
      "full": 100
    },
    //   {
    //   "category": this.translations.deaths,
    //   "value": this.totalDeaths / this.finishedCases * 100,
    //   "full": 100
    // }, {
    //   "category": this.translations.recovered,
    //   "value": this.totalRecoveries / this.finishedCases * 100,
    //   "full": 100
    // }, {
    //   "category": this.translations.active,
    //   "value": 100 - (this.totalCritical / this.activeCases * 100),
    //   "full": 100
    // }
    ];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis < am4charts.AxisRendererRadial > ());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      if (target.dataItem.index == 0) {
        return am4core.color("#ff5b5b");
      }
      if (target.dataItem.index == 1) {
        return am4core.color("#f9c851");
      }
      if (target.dataItem.index == 2) {
        return am4core.color("#10c469");
      }
      return am4core.color("#21AFDD");
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis < am4charts.AxisRendererCircular > ());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    // Create series
    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template["cornerRadiusTopLeft"] = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      //return chart.colors.getIndex(target.dataItem.index);
      if (target.dataItem.index == 0) {
        return am4core.color("#f9c851");
      }
      if (target.dataItem.index == 1) {
        return am4core.color("#ff5b5b");
      }
      if (target.dataItem.index == 2) {
        return am4core.color("#10c469");
      }
      return am4core.color("#21AFDD");
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.fill = am4core.color("#282e38");
    chart.tooltip.label.fill = am4core.color("#282e38");

    this.radarChart = chart;
  }
  createSeriesLine(chart, color, type) {
    let name = null;

    if(type=="cases"){
      name = this.translations.cases;

    } else if(type=="recoveries"){

      name = this.translations.recovered;

    } else if(type=="deaths"){
      name = this.translations.deaths;

    }
    else if(type=="notified"){
      name = this.translations.notified;
    }

    else if(type=="suspect"){
      name = this.translations.suspect;
    }

    else if(type=="discarded"){
      name = this.translations.discarded;
    }

    else if(type=="active"){
      name = this.translations.active;
    }

    else if(type=="cured"){
      name = this.translations.cured;
    }

    else if(type=="hospitalized"){
      name = this.translations.hospitalized;
    }

    if(!name){
      name = type.charAt(0).toUpperCase() + type.slice(1);
    }
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = type;
    series.fill = am4core.color(color);
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY} " + name;
    series.tooltip.pointerOrientation = "vertical";

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;

    series.stroke = am4core.color(color);
    series.legendSettings.labelText = name;
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = am4core.color("#282e38");
    return chart
  }
  async setTranslations(translations){
    this.translations.active = translations['Shared.Other.14'];
    this.translations.recovered = translations['Shared.Other.15'];
    this.translations.deaths = translations['Shared.Other.16'];
    this.translations.critical = translations['Shared.Other.17'];
    this.translations.cases = translations['Shared.Other.14'];
    this.translations.notified = translations['Shared.Other.21'];
    this.translations.suspect = translations['Shared.Other.22'];
    this.translations.discarded = translations['Shared.Other.23'];
    this.translations.cured = translations['Shared.Other.24'];
    this.translations.hospitalized = translations['Shared.Other.25'];
    this.translations.active = translations['Shared.Other.26'];
  }


}
