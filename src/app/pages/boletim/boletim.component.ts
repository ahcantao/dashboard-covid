import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../core/services/getdata.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.scss']
})
export class BoletimComponent implements OnInit {

  cityName: string;
  state: string;


  cityNameBoletim: string;
  stateBoletim: string;

  totalConfirmed='0';
  totalCured = '0';
  totalActive = '0';
  totalHospitalized = '0';
  todayActive = '0';
  todayDeath='0';
  totalNotified='0';
  totalSuspect='0';
  totalDeath='0';

  todayTotalActive='0';
  todayTotalConfirmed='0';
  todayTotalCured='0';
  todayTotalDiscarded='0';
  todayTotalHospitalized='0';
  todayTotalNotified='0';
  todayTotalSuspect='0';
  totalDiscarded = '0';
  todayTotalDeath = '0';
  lastUpdate;

  isLoading = true;
  isSmallScreen;


  route$: Subscription;


  constructor(private _getDataService: GetdataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (window.innerWidth < 991.98){
      this.isSmallScreen = true;
    }

    this.route$ = this.route.params.subscribe(routeParams => {

      // this.ngOnDestroy();

      this.isLoading = true;
      this.state = this.route.snapshot.params['state'].toLowerCase();
      this.cityName = this.route.snapshot.params['cityName'].toLowerCase();

      this.reload();



    })

  }

   plusSign(_string){

    return (parseInt(_string) > 0 ? '+' : '') + _string;

  }

  reload(){
    this._getDataService.getCity(this.state, this.cityName).subscribe((arrayOfResults) => {
      arrayOfResults.map((res) => {
        this.lastUpdate = res.date;
        this.cityNameBoletim = this.titleCase(res.cityName);
        this.stateBoletim = res.state.toUpperCase();

        this.totalActive = res.totalActive;
        this.todayTotalActive = this.plusSign(res.todayTotalActive);

        this.totalConfirmed = res.totalConfirmed;
        this.todayTotalConfirmed = this.plusSign(res.todayTotalConfirmed);

        this.totalCured = res.totalCured;
        this.todayTotalCured = this.plusSign(res.todayTotalCured);

        this.totalNotified = res.totalNotified;
        this.todayTotalNotified = this.plusSign(res.todayTotalNotified);

        this.totalSuspect = res.totalSuspect;
        this.todayTotalSuspect = this.plusSign(res.todayTotalSuspect);

        this.totalDiscarded = res.totalDiscarded;
        this.todayTotalDiscarded = this.plusSign(res.todayTotalDiscarded);

        this.totalHospitalized = res.totalHospitalized;
        this.todayTotalHospitalized = this.plusSign(res.todayTotalHospitalized);

        this.totalDeath = res.totalDeath;
        this.todayTotalDeath = this.plusSign(res.todayTotalDeath);


      });

      this.isLoading = false;
    })
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

}
