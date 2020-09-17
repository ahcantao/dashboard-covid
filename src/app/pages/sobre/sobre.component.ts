import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle("PI-COVID - Sobre")
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
