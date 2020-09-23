import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoletimComponent} from './boletim.component';


const routes: Routes = [

  { path: ':state/:cityName', component: BoletimComponent},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletimRoutingModule { }
