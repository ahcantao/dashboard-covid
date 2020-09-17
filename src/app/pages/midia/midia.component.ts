import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.scss']
})
export class MidiaComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle("PI-COVID - Na Mídia")
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
