import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { CountryComponent } from './pages/country/country.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {CityComponent} from "./pages/city/city.component";
import {AnalisesComponent} from './pages/analises/analises.component';
import {SobreComponent} from './pages/sobre/sobre.component';
import {MidiaComponent} from './pages/midia/midia.component';
import {MapaComponent} from './pages/mapa/mapa.component';


const routes: Routes = [
  { path: '',  component: CityComponent},
  { path: 'analises',  component: AnalisesComponent},
  { path: 'sobre',  component: SobreComponent},
  { path: 'na-midia',  component: MidiaComponent},
  { path: 'mapa-calor',  component: MapaComponent},
  { path: 'mapa',  component: MapaComponent},
  // { path: 'analises',  component: AnalysisComponent},
  // { path: 'country/:name', component : CountryComponent},
  // { path: 'city/:name', component : CityComponent},
  { path: '**', component : NotFoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})]
})
export class AppRoutingModule { }
