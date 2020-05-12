import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { CountryComponent } from './pages/country/country.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {CityComponent} from "./pages/city/city.component";


const routes: Routes = [
  { path: '',  component: CityComponent},
  // { path: 'analises',  component: AnalysisComponent},
  // { path: 'country/:name', component : CountryComponent},
  // { path: 'city/:name', component : CityComponent},
  { path: '**', component : NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
