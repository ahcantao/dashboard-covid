import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityComponent} from './city.component';
import {RotaCidadeGuard} from '../../shared/guard/rota-cidade.guard';


const routes: Routes = [
  { path: ':cityName', component: CityComponent, canActivate: [RotaCidadeGuard]},
  { path: ':state/:cityName', component: CityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
