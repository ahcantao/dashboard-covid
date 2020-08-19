import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-data-studio',
  templateUrl: './data-studio.component.html',
  styleUrls: ['./data-studio.component.scss']
})
export class DataStudioComponent implements OnInit {
  @Input() url: string;

  urlSafe: SafeResourceUrl;
  isFirefox: boolean = false;
  isSmallScreen: boolean = false;


  constructor (public sanitizer:DomSanitizer) {

    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
      this.isFirefox = true;
      // window.location.href = this.url;
      // this.url = '';
    }

    if (window.innerWidth < 700){
      this.isSmallScreen = true;
    }
  }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
