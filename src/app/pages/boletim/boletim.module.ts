import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletimRoutingModule } from './boletim-routing.module';
import {BoletimComponent} from './boletim.component';


@NgModule({
  declarations: [BoletimComponent],
  imports: [
    CommonModule,
    BoletimRoutingModule
  ]
})
export class BoletimModule { }
