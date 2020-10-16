import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import {CityComponent} from './city.component';


import { TranslateModule } from '@ngx-translate/core';
import {CravinhosConfirmadosModal} from '../../modals/cravinhos-confirmados.modal';
import {CravinhosSuspeitosModal} from '../../modals/cravinhos-suspeitos.modal';
import {CravinhosIframeModal} from '../../modals/cravinhos-iframe.modal';
import { PlotHistoricoComponent } from './plot-historico/plot-historico.component';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {FormsModule} from '@angular/forms';
defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
      CityComponent,

      CravinhosIframeModal,

      PlotHistoricoComponent


  ],
  imports: [
    CommonModule,
    CityRoutingModule,
      TranslateModule,
      ChartsModule,
      BsDatepickerModule.forRoot(),
      FormsModule
  ]
})
export class CityModule { }
