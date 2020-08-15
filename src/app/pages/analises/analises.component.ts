import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-analises',
  templateUrl: './analises.component.html',
  styleUrls: ['./analises.component.scss']
})
export class AnalisesComponent implements OnInit {

  @Input()
  url: string = "https://datastudio.google.com/embed/reporting/194278c0-68be-4d83-a2e8-03f40c3ee416/page/AVnaB";
  urlSafe: SafeResourceUrl;
  isFirefox: boolean = false;
  isSmallScreen: boolean = false;


  constructor (public sanitizer:DomSanitizer) {

    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
      this.isFirefox = true;
    }

    if (window.innerWidth < 700){
      this.isSmallScreen = true;
    }
  }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);


  }

}
