import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import {CityComponent} from './city.component';


import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
      CityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
      TranslateModule
  ]
})
export class CityModule { }
