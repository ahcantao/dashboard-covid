import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  todayDate  = new Date();

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle("PI-COVID - Sobre")
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  copyToClip(textArea: HTMLInputElement){
    textArea.select();
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);
    // document.execCommand('copy');
  }

}
