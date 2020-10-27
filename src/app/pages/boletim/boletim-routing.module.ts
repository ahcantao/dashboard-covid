import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoletimComponent} from './boletim.component';
import {RotaCidadeGuard} from '../../shared/guard/rota-cidade.guard';


const routes: Routes = [

  { path: ':cityName', component: BoletimComponent, canActivate: [RotaCidadeGuard]},
  { path: ':state/:cityName', component: BoletimComponent},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletimRoutingModule { }
