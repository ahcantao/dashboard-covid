import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'modal-cravinhos-iframe',
    template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <iframe [src]="safeUrl" frameborder="0" scrolling="yes" seamless="seamless" style="display:block; width:100%; height:400px;"></iframe>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})

export class CravinhosIframeModal implements OnInit {
    title: string;
    closeBtnName: string;

    myUrl: string;
    safeUrl: SafeResourceUrl;

    constructor(public bsModalRef: BsModalRef, private sanitizer: DomSanitizer) {}
    ngOnInit() {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);
    }
}
