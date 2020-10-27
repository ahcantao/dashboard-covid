import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  DoCheck
} from '@angular/core';
import CITY_CODES from "../../shared/utils/cities"


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService} from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';


import {
  ActivatedRoute, Router
} from '@angular/router';
//
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_pt_BR from "@amcharts/amcharts4/lang/pt_BR";


import {
  GetdataService
} from "./../../core/services/getdata.service";
import {
  Observable, of,
  Subscription
} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {CravinhosIframeModal} from '../../modals/cravinhos-iframe.modal';
import { groupBy, map, mergeMap, toArray} from 'rxjs/operators';


// TEMA ANIMADO (ON/OFF)

// am4core.options.onlyShowOnViewport = true;
// am4core.options.deferredDelay = 500;
am4core.options.queue = true;
am4core.options.minPolylineStep = 15;
am4core.options.autoDispose = true;

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit, OnDestroy, DoCheck {

  public cityCodes = CITY_CODES;

  combined$: Subscription;
  week$: Subscription;
  route$: Subscription;

  private pieChart: am4charts.PieChart;
  private lineChart: am4charts.XYChart;
  // private lineChartToday: am4charts.XYChart;
  // private radarChart: am4charts.RadarChart;

  locale = 'pt-br';

  dateRangeFilter: Date[];


  isDataAvailable:boolean = false;
  days = [];
  confirmedData = [];
  deathData = [];
  suspectData = [];
  activeData = [];

  todayConfirmedData = [];
  todayDeathData = [];
  todaySuspectData = [];
  todayActiveData = [];


  weeks = [];
  weekActiveData = [];
  weekConfirmedData = [];
  weekCuredData = [];
  weekSuspectData = [];
  weekDiscardedData = [];
  weekHospitalizedData = [];
  weekDeathData = [];


  public isLoading: boolean = true;

  public timeLine;

  public lastUpdate;
  public totalConfirmed=0;
  public totalDeaths=0;
  public totalRecoveries;
  totalCured = 0;
  totalActive = 0;
  totalHospitalized = 0;
  todayCured = 0;
  todayActive = 0;
  todayHospitalized = 0;
  public todayConfirmed=0;
  public todayDeaths=0;
  public activeCases=0;

  public totalNotified=0;
  public totalSuspect=0;
  public todayNotified=0;
  public todaySuspect=0;
  public todayTotalNotified=0;
  public todayTotalSuspect=0;
  public totalDiscarded = 0;
  public todayDiscarded = 0;
  public totalInhabitants2020 = 0;
  public cityPath: any;
  public cityName: any;
  public state: any;
  public translations : any = {};

  bsModalRef: BsModalRef;

  constructor(
      private route: ActivatedRoute,
      private _getDataService: GetdataService,
      private zone: NgZone,
      public translate : TranslateService,
      public router: Router,
      private titleService: Title,
      private modalService: BsModalService,
      private localeService: BsLocaleService
  )
  {
  }

  ngOnDestroy() {
    // this.zone.runOutsideAngular(() => {

      am4core.disposeAllCharts();

      // if (this.pieChart) {
      //   this.pieChart.dispose();
      // }
      // if (this.lineChart) {
      //   this.lineChart.dispose();
      // }
      // if (this.radarChart) {
      //   this.radarChart.dispose();
      // } if(this.lineChartToday){
      //   this.lineChartToday.dispose();
      // }


    if (this.combined$){
      this.combined$.unsubscribe();
    }

    if (this.week$){
      this.week$.unsubscribe();
    }

    if (this.route$){
      this.route$.unsubscribe();
    }

    // this.reload();

    // });

  }

  async ngDoCheck() {
    this.translate.get(['Shared.Other.14', 'Shared.Other.15', 'Shared.Other.16', 'Shared.Other.17', 'Shared.Other.21', 'Shared.Other.22', 'Shared.Other.23', 'Shared.Other.24', 'Shared.Other.25', 'Shared.Other.26', 'Shared.TopCards.1', 'Shared.TopCards.3', 'Shared.TopCards.4'])
    .subscribe(translations => {
      this.setTranslations(translations);
      return 0;
    });
  }

  ngOnInit() {

    this.localeService.use(this.locale);


    this.route$ = this.route.params.subscribe(routeParams => {

      this.isLoading = true;
      this.isDataAvailable = false;

      // this.ngOnDestroy();

      this.state = this.route.snapshot.params['state'].toLowerCase();
      this.cityName = this.route.snapshot.params['cityName'].toLowerCase();
      this.cityPath = this.route.snapshot.params['cityName'].toLowerCase();

      if (this.cityName in this.cityCodes){
        this.state = this.cityCodes[this.cityName].estado.toLowerCase();
        this.cityName = this.cityCodes[this.cityName].cidade.toLowerCase();
      }


      this.reload();

      // this.isLoading = false;


    });


  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  updateBoletim(boletim: any){

    this.lastUpdate = boletim['isoDate'];
    this.cityName = boletim["cityName"];
    this.state = boletim["state"];

    this.totalConfirmed = boletim["totalConfirmed"];
    this.totalDeaths = boletim["totalDeath"];
    this.totalNotified = boletim["totalNotified"];
    this.totalSuspect = boletim["totalSuspect"];
    this.totalDiscarded = boletim["totalDiscarded"];
    this.totalCured = boletim["totalCured"];
    this.totalActive = boletim["totalActive"];
    this.totalHospitalized = boletim["totalHospitalized"];

    this.totalInhabitants2020 = boletim["estimatedPopulation2020"];


    this.todayConfirmed = boletim["todayTotalConfirmed"];
    this.todayDeaths = boletim["todayTotalDeath"];
    this.todayNotified = boletim["todayTotalNotified"];
    this.todaySuspect = boletim["todayTotalSuspect"];
    this.todayDiscarded = boletim["todayTotalDiscarded"];
    this.todayCured = boletim["todayTotalCured"];
    this.todayActive = boletim["todayTotalActive"];
    this.todayHospitalized = boletim["todayTotalHospitalized"];

  }

  reload(){

    am4core.disposeAllCharts();

    this.days = [];
    this.confirmedData = [];
    this.deathData = [];
    this.suspectData = [];
    this.activeData = [];

    this.todayConfirmedData = [];
    this.todayDeathData = [];
    this.todaySuspectData = [];
    this.todayActiveData = [];

    this.weeks = [];
    this.weekActiveData = [];
    this.weekConfirmedData = [];
    this.weekCuredData = [];
    this.weekSuspectData = [];
    this.weekDiscardedData = [];
    this.weekHospitalizedData = [];
    this.weekDeathData = [];

    const cityData = this._getDataService.getTimelineCity(this.state, this.cityName);

    //
    // const epidemiologicalWeek = cityData.pipe(
    //     mergeMap(array => array),
    //     groupBy((day:any) => day?.epidemiologicalWeek),
    //     // flatMap(group => group.pipe(map(item => ({item, key:group.key}))))
    //     mergeMap(timeline => timeline.pipe(toArray())),
    //
    //
    //     map((val) => {
    //       let weekTotalActive = 0;
    //       let weekTotalConfirmed = 0;
    //       let weekTotalCured = 0;
    //       let weekTotalSuspect = 0;
    //       let weekTotalDiscarded = 0;
    //       let weekTotalHospitalized = 0;
    //       let weekTotalDeath = 0;
    //
    //       val.map((v:any) => {
    //         weekTotalActive = weekTotalActive + v.todayTotalActive;
    //         weekTotalConfirmed = weekTotalConfirmed + v.todayTotalConfirmed;
    //         weekTotalCured = weekTotalCured + v.todayTotalCured;
    //         weekTotalSuspect = weekTotalSuspect + v.todayTotalSuspect;
    //         weekTotalDiscarded = weekTotalDiscarded + v.todayTotalDiscarded;
    //         weekTotalHospitalized = weekTotalHospitalized + v.todayTotalHospitalized;
    //         weekTotalDeath = weekTotalDeath + v.todayTotalDeath;
    //
    //
    //       });
    //       return {
    //         epidemiologicalWeek: val[0]?.epidemiologicalWeek,
    //
    //         weekTotalActive: weekTotalActive,
    //         weekTotalConfirmed: weekTotalConfirmed,
    //         weekTotalCured: weekTotalCured,
    //         weekTotalSuspect: weekTotalSuspect,
    //         weekTotalDiscarded: weekTotalDiscarded,
    //         weekTotalHospitalized: weekTotalHospitalized,
    //         weekTotalDeath: weekTotalDeath
    //
    //       };
    //     }),
    //
    //     toArray()
    // );
    //
    // this.week$ = epidemiologicalWeek.subscribe(res => {
    //
    //   this.generateWeekPlotsData(res);
    //
    // });


    const epidemiologicalWeek = cityData.pipe(
        mergeMap(array => array),
        groupBy((day:any) => day?.epidemiologicalWeek),
        // flatMap(group => group.pipe(map(item => ({item, key:group.key}))))
        mergeMap(timeline => timeline.pipe(toArray())),
        // tap(r => console.log(r)),


        map((val) => {


          let weekTotalActive = 0;
          let weekTotalConfirmed = 0;
          let weekTotalCured = 0;
          let weekTotalSuspect = 0;
          let weekTotalDiscarded = 0;
          let weekTotalHospitalized = 0;
          let weekTotalDeath = 0;


          return val.reduce((total, day) => {

            total.weekTotalActive += day.todayTotalActive;
            total.weekTotalConfirmed += day.todayTotalConfirmed;
            total.weekTotalCured += day.todayTotalCured;
            total.weekTotalSuspect += day.todayTotalSuspect;
            total.weekTotalDiscarded += day.todayTotalDiscarded;
            total.weekTotalHospitalized += day.todayTotalHospitalized;
            total.weekTotalDeath += day.todayTotalDeath;

            return total

          }, {
              epidemiologicalWeek: val[0]?.epidemiologicalWeek,
              weekTotalActive: 0,
              weekTotalConfirmed: 0,
              weekTotalCured: 0,
              weekTotalSuspect: 0,
              weekTotalDiscarded: 0,
              weekTotalHospitalized: 0,
              weekTotalDeath: 0
          });

          //
          // val.map((v:any) => {
          //   weekTotalActive = weekTotalActive + v.todayTotalActive;
          //   weekTotalConfirmed = weekTotalConfirmed + v.todayTotalConfirmed;
          //   weekTotalCured = weekTotalCured + v.todayTotalCured;
          //   weekTotalSuspect = weekTotalSuspect + v.todayTotalSuspect;
          //   weekTotalDiscarded = weekTotalDiscarded + v.todayTotalDiscarded;
          //   weekTotalHospitalized = weekTotalHospitalized + v.todayTotalHospitalized;
          //   weekTotalDeath = weekTotalDeath + v.todayTotalDeath;
          //
          //
          // });
          //
          // return {
          //   epidemiologicalWeek: val[0]?.epidemiologicalWeek,
          //
          //   weekTotalActive: weekTotalActive,
          //   weekTotalConfirmed: weekTotalConfirmed,
          //   weekTotalCured: weekTotalCured,
          //   weekTotalSuspect: weekTotalSuspect,
          //   weekTotalDiscarded: weekTotalDiscarded,
          //   weekTotalHospitalized: weekTotalHospitalized,
          //   weekTotalDeath: weekTotalDeath
          //
          // };
        }),

        // map(t => t.total),
        toArray(),
        // tap(r => console.log(r))
    );

    this.week$ = epidemiologicalWeek.subscribe(res => {

      this.generateWeekPlotsData(res);

    });



    this.combined$ = cityData.subscribe((res) => {

      const boletim = res[res.length-1];

      this.generatePlotsData(res);

      this.updateBoletim(boletim);

      this.isLoading = false;
      this.isDataAvailable = true;

      this.timeLine = res;

      this.loadPieChart();
      this.loadLineChart(false);


    }, (e) => {console.warn(e)});



    if (this.cityName){

      this.setTitle(`PI-COVID - Painel de ${this.cityName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}/${this.state.toUpperCase()}`)

    }

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


    // let first_day = plotData[6];
    // let n_th_day = plotData[plotData.length-1];
    // let total_days = plotData.length-7;
    // let doubling_time = (total_days * Math.log(2)) / (Math.log(n_th_day['cases']/first_day['cases']));
    //
    // let last_5_days = plotData[plotData.length-6];
    // let doubling_time_5_days = (5 * Math.log(2)) / (Math.log(n_th_day['cases']/last_5_days['cases']));
    //
    // console.log('Tempo para dobrar casos confirmados desde primeiro caso: ', doubling_time.toFixed(2) + ' dias');
    // console.log('Tempo para dobrar casos confirmados nos últimos 5 dias: ', doubling_time_5_days.toFixed(2) + ' dias');


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


    // var update06_05 = dateAxis.axisRanges.create();
    // update06_05.date = new Date("2020-05-06 12:00");
    // update06_05.grid.stroke = am4core.color("#fd7e14");
    // update06_05.grid.strokeWidth = 3;
    // update06_05.grid.strokeOpacity = 0.5;
    // // update06_05.grid.strokeDasharray = "8,4";
    // update06_05.grid.tooltip = new am4core.Tooltip();
    // update06_05.grid.tooltipText = "clique para informações";
    // update06_05.grid.tooltipPosition = "pointer";
    //
    // update06_05.grid.events.on("hit", function(ev) {
    //   chart.modal.close();
    //   chart.openModal("A partir de 06/05/2020, a Prefeitura passou a divulgar o número de casos suspeitos e descartados como a soma de leves + graves, antes desta data era divulgado somente os casos graves.", "Informação");
    // });
    //
    //
    // var update07_05 = dateAxis.axisRanges.create();
    // update07_05.date = new Date("2020-05-07 12:00");
    // update07_05.grid.stroke = am4core.color("#f9c851");
    // update07_05.grid.strokeWidth = 3;
    // update07_05.grid.strokeOpacity = 0.5;
    // // update07_05.grid.strokeDasharray = "8,4";
    // update07_05.grid.tooltip = new am4core.Tooltip();
    // update07_05.grid.tooltipText = "clique para informações";
    // update07_05.grid.tooltipPosition = "pointer";
    //
    // update07_05.grid.events.on("hit", function(ev) {
    //   chart.modal.close();
    //   chart.openModal("A partir de 07/05/2020, as notificações de casos leves - sem coleta para exame - deixaram de ser contados como descartados e passaram a contar como suspeitos durante 14 dias.", "Informação");
    // });




    this.lineChart = chart;
  }

  // loadLineChartToday(chartType) {
  //   let caseData = this.timeLine;
  //   let plotData = []
  //
  //   caseData.forEach(async element => {
  //
  //
  //     plotData.push({
  //       date: element['isoDate'],
  //       cases: element['todayTotalConfirmed'],
  //       deaths: element['todayTotalDeath'],
  //       suspect: element['todayTotalSuspect'],
  //       discarded: element['todayTotalDiscarded'],
  //       active: element['todayTotalActive'],
  //       cured: element['todayTotalCured'],
  //       hospitalized: element['todayTotalHospitalized']
  //     });
  //
  //   });
  //
  //   let chart = am4core.create("lineChartToday", am4charts.XYChart);
  //   chart.numberFormatter.numberFormat = "#a";
  //   chart.numberFormatter.bigNumberPrefixes = [
  //     { "number": 1e+3, "suffix": "K" },
  //     { "number": 1e+6, "suffix": "M" },
  //     { "number": 1e+9, "suffix": "B" }
  //   ];
  //
  //
  //   chart.language.locale = am4lang_pt_BR;
  //   chart.numberFormatter.language = new am4core.Language();
  //   chart.numberFormatter.language.locale = am4lang_pt_BR;
  //   chart.dateFormatter.language = new am4core.Language();
  //   chart.dateFormatter.language.locale = am4lang_pt_BR;
  //
  //   // Create axes
  //   let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  //   dateAxis.renderer.minGridDistance = 50;
  //
  //
  //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   // valueAxis.logarithmic = chartType;
  //
  //   valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
  //   dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
  //
  //   chart = this.createStepLineSeries(chart, "#21AFDD", "cases");
  //   chart = this.createStepLineSeries(chart, "#ff5b5b", "deaths");
  //   chart = this.createStepLineSeries(chart, "#f9c851", "suspect");
  //   // chart = this.createStepLineSeries(chart, "#fd7e14", "discarded");
  //   // chart = this.createStepLineSeries(chart, "#9c27b0", "active");
  //   chart = this.createStepLineSeries(chart, "#fcfcfc", "cured");
  //   // chart = this.createStepLineSeries(chart, "#a36f40", "hospitalized");
  //
  //   chart.data = plotData;
  //
  //   chart.legend = new am4charts.Legend();
  //   chart.legend.labels.template.fill = am4core.color("#adb5bd");
  //
  //   chart.cursor = new am4charts.XYCursor();
  //
  //   this.lineChartToday = chart;
  // }

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

  // loadRadar() {
  //   let chart = am4core.create("radarChart", am4charts.RadarChart);
  //
  //   // Add data
  //   chart.data = [{
  //     "category": this.translations.deaths,
  //     "value": this.totalDeaths / this.totalConfirmed * 100,
  //     "full": 100
  //   },
  //   //   {
  //   //   "category": this.translations.deaths,
  //   //   "value": this.totalDeaths / this.finishedCases * 100,
  //   //   "full": 100
  //   // }, {
  //   //   "category": this.translations.recovered,
  //   //   "value": this.totalRecoveries / this.finishedCases * 100,
  //   //   "full": 100
  //   // }, {
  //   //   "category": this.translations.active,
  //   //   "value": 100 - (this.totalCritical / this.activeCases * 100),
  //   //   "full": 100
  //   // }
  //   ];
  //
  //   // Make chart not full circle
  //   chart.startAngle = -90;
  //   chart.endAngle = 180;
  //   chart.innerRadius = am4core.percent(20);
  //
  //   // Set number format
  //   chart.numberFormatter.numberFormat = "#.#'%'";
  //
  //   // Create axes
  //   let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis < am4charts.AxisRendererRadial > ());
  //   categoryAxis.dataFields.category = "category";
  //   categoryAxis.renderer.grid.template.location = 0;
  //   categoryAxis.renderer.grid.template.strokeOpacity = 0;
  //   categoryAxis.renderer.labels.template.horizontalCenter = "right";
  //   categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
  //     if (target.dataItem.index == 0) {
  //       return am4core.color("#ff5b5b");
  //     }
  //     if (target.dataItem.index == 1) {
  //       return am4core.color("#f9c851");
  //     }
  //     if (target.dataItem.index == 2) {
  //       return am4core.color("#10c469");
  //     }
  //     return am4core.color("#21AFDD");
  //   });
  //   categoryAxis.renderer.minGridDistance = 10;
  //
  //   let valueAxis = chart.xAxes.push(new am4charts.ValueAxis < am4charts.AxisRendererCircular > ());
  //   valueAxis.renderer.grid.template.strokeOpacity = 0;
  //   valueAxis.min = 0;
  //   valueAxis.max = 100;
  //   valueAxis.strictMinMax = true;
  //
  //   valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
  //
  //   // Create series
  //   let series1 = chart.series.push(new am4charts.RadarColumnSeries());
  //   series1.dataFields.valueX = "full";
  //   series1.dataFields.categoryY = "category";
  //   series1.clustered = false;
  //   series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
  //   series1.columns.template.fillOpacity = 0.08;
  //   series1.columns.template["cornerRadiusTopLeft"] = 20;
  //   series1.columns.template.strokeWidth = 0;
  //   series1.columns.template.radarColumn.cornerRadius = 20;
  //
  //   let series2 = chart.series.push(new am4charts.RadarColumnSeries());
  //   series2.dataFields.valueX = "value";
  //   series2.dataFields.categoryY = "category";
  //   series2.clustered = false;
  //   series2.columns.template.strokeWidth = 0;
  //   series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
  //   series2.columns.template.radarColumn.cornerRadius = 20;
  //
  //   series2.columns.template.adapter.add("fill", function (fill, target) {
  //     //return chart.colors.getIndex(target.dataItem.index);
  //     if (target.dataItem.index == 0) {
  //       return am4core.color("#f9c851");
  //     }
  //     if (target.dataItem.index == 1) {
  //       return am4core.color("#ff5b5b");
  //     }
  //     if (target.dataItem.index == 2) {
  //       return am4core.color("#10c469");
  //     }
  //     return am4core.color("#21AFDD");
  //   });
  //
  //   // Add cursor
  //   chart.cursor = new am4charts.RadarCursor();
  //   chart.cursor.fill = am4core.color("#282e38");
  //   chart.tooltip.label.fill = am4core.color("#282e38");
  //
  //   this.radarChart = chart;
  // }

  createSeriesColumn(chart, color, type) {
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
    let series = chart.series.push(new am4charts.ColumnSeries());
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

  createStepLineSeries(chart, color, type) {
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
    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.valueY = type;
    series.fill = am4core.color(color);
    series.fillOpacity = 0.5;
    series.connect = false;
    series.noRisers = true;

    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    // series.minBulletDistance = 10;
    series.tooltipText = "{valueY} " + name;
    series.tooltip.pointerOrientation = "vertical";

    // series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 1;

    series.stroke = am4core.color(color);
    series.legendSettings.labelText = name;
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = am4core.color("#282e38");
    return chart
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

  openIframeModal(iframeUrl: string, title){

    const initialState = {
      myUrl: iframeUrl,
      title: title
    };
    this.bsModalRef = this.modalService.show(CravinhosIframeModal, {initialState});
    this.bsModalRef.content.closeBtnName = 'Fechar';

  }

  generatePlotsData(dataArray){
    dataArray.forEach((dia) => {
      this.days.push(dia.date);

      this.confirmedData.push(dia.totalConfirmed);
      this.deathData.push(dia.totalDeath);
      this.suspectData.push(dia.totalSuspect);
      this.activeData.push(dia.totalActive);

      this.todayConfirmedData.push(dia.todayTotalConfirmed);
      this.todayDeathData.push(dia.todayTotalDeath);
      this.todaySuspectData.push(dia.todayTotalSuspect);
      this.todayActiveData.push(dia.todayTotalActive);
    })
  }

  generateWeekPlotsData(dataArray){
    dataArray.forEach((dia) => {
      // console.log(dia);return;
      this.weeks.push(dia.epidemiologicalWeek);
      this.weekActiveData.push(dia.weekTotalActive);
      this.weekConfirmedData.push(dia.weekTotalConfirmed);
      this.weekCuredData.push(dia.weekTotalCured);
      this.weekSuspectData.push(dia.weekTotalSuspect);
      this.weekDiscardedData.push(dia.weekTotalDiscarded);
      this.weekHospitalizedData.push(dia.weekTotalHospitalized);
      this.weekDeathData.push(dia.weekTotalDeath);

    })
  }


  // Filtrar dados

  filterByDateButtonClicked(){
    if (this.dateRangeFilter.length > 0){
      let start = this.dateRangeFilter[0];
      start.setHours(0,0,0);

      let end = this.dateRangeFilter[1];
      end.setHours(0,0,0);


      this.reloadFilterData(
          of(this.filterByDate(start, end))
      );
    }
  }

  filterByDate(start:Date, end:Date) {

    if (this.timeLine) {
      return this.timeLine.filter(item => {
        let date = new Date(item.isoDate);
        date.setHours(0,0,0);

        return date >= start && date <= end;
      })
    }
  }

  reloadTimelineData(){
    this.reloadFilterData(of(this.timeLine));
  }

  reloadFilterData(cityData:Observable<any>){

    this.isLoading = true;
    this.isDataAvailable = false;


    // this.pieChart.dispose();

    this.days = [];
    this.confirmedData = [];
    this.deathData = [];
    this.suspectData = [];
    this.activeData = [];

    this.todayConfirmedData = [];
    this.todayDeathData = [];
    this.todaySuspectData = [];
    this.todayActiveData = [];

    this.weeks = [];
    this.weekActiveData = [];
    this.weekConfirmedData = [];
    this.weekCuredData = [];
    this.weekSuspectData = [];
    this.weekDiscardedData = [];
    this.weekHospitalizedData = [];
    this.weekDeathData = [];

    const epidemiologicalWeek = cityData.pipe(
        mergeMap(array => array),
        groupBy((day:any) => day?.epidemiologicalWeek),
        // flatMap(group => group.pipe(map(item => ({item, key:group.key}))))
        mergeMap(timeline => timeline.pipe(toArray())),
        // tap(r => console.log(r)),


        map((val) => {


          let weekTotalActive = 0;
          let weekTotalConfirmed = 0;
          let weekTotalCured = 0;
          let weekTotalSuspect = 0;
          let weekTotalDiscarded = 0;
          let weekTotalHospitalized = 0;
          let weekTotalDeath = 0;


          return val.reduce((total, day) => {

            total.weekTotalActive += day.todayTotalActive;
            total.weekTotalConfirmed += day.todayTotalConfirmed;
            total.weekTotalCured += day.todayTotalCured;
            total.weekTotalSuspect += day.todayTotalSuspect;
            total.weekTotalDiscarded += day.todayTotalDiscarded;
            total.weekTotalHospitalized += day.todayTotalHospitalized;
            total.weekTotalDeath += day.todayTotalDeath;

            return total

          }, {
            epidemiologicalWeek: val[0]?.epidemiologicalWeek,
            weekTotalActive: 0,
            weekTotalConfirmed: 0,
            weekTotalCured: 0,
            weekTotalSuspect: 0,
            weekTotalDiscarded: 0,
            weekTotalHospitalized: 0,
            weekTotalDeath: 0
          });

          //
          // val.map((v:any) => {
          //   weekTotalActive = weekTotalActive + v.todayTotalActive;
          //   weekTotalConfirmed = weekTotalConfirmed + v.todayTotalConfirmed;
          //   weekTotalCured = weekTotalCured + v.todayTotalCured;
          //   weekTotalSuspect = weekTotalSuspect + v.todayTotalSuspect;
          //   weekTotalDiscarded = weekTotalDiscarded + v.todayTotalDiscarded;
          //   weekTotalHospitalized = weekTotalHospitalized + v.todayTotalHospitalized;
          //   weekTotalDeath = weekTotalDeath + v.todayTotalDeath;
          //
          //
          // });
          //
          // return {
          //   epidemiologicalWeek: val[0]?.epidemiologicalWeek,
          //
          //   weekTotalActive: weekTotalActive,
          //   weekTotalConfirmed: weekTotalConfirmed,
          //   weekTotalCured: weekTotalCured,
          //   weekTotalSuspect: weekTotalSuspect,
          //   weekTotalDiscarded: weekTotalDiscarded,
          //   weekTotalHospitalized: weekTotalHospitalized,
          //   weekTotalDeath: weekTotalDeath
          //
          // };
        }),

        // map(t => t.total),
        toArray(),
        // tap(r => console.log(r))
    );

    this.week$ = epidemiologicalWeek.subscribe(res => {

      this.generateWeekPlotsData(res);

    });



    this.combined$ = cityData.subscribe((res) => {

      this.generatePlotsData(res);


      // this.loadPieChart();

      this.isLoading = false;
      this.isDataAvailable = true;


    }, (e) => {console.warn(e)});


  }


}
