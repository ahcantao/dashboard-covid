import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import {CityComponent} from './city.component';


import { TranslateModule } from '@ngx-translate/core';
import {CravinhosConfirmadosModal} from '../../modals/cravinhos-confirmados.modal';
import {CravinhosSuspeitosModal} from '../../modals/cravinhos-suspeitos.modal';
import {CravinhosIframeModal} from '../../modals/cravinhos-iframe.modal';

@NgModule({
  declarations: [
      CityComponent,

      CravinhosIframeModal


  ],
  imports: [
    CommonModule,
    CityRoutingModule,
      TranslateModule
  ]
})
export class CityModule { }
