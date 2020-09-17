import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-informacoes-tecnicas',
  templateUrl: './informacoes-tecnicas.component.html',
  styleUrls: ['./informacoes-tecnicas.component.scss']
})
export class InformacoesTecnicasComponent implements OnInit {



  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle("PI-COVID - Informações técnicas")
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
