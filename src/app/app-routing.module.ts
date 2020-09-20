import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {SobreComponent} from './pages/sobre/sobre.component';
import {MidiaComponent} from './pages/midia/midia.component';
import {CravinhosComponent} from './pages/cravinhos/cravinhos.component';
import {LiveComponent} from './pages/cravinhos/live/live.component';
import {InicioComponent} from './pages/inicio/inicio.component';


const routes: Routes = [
  { path: '',  component: InicioComponent},


  // { path: 'cravinhos',  component: CravinhosComponent},
  { path: 'live',  component: LiveComponent},

  { path: 'sobre',  component: SobreComponent},
  { path: 'na-midia',  component: MidiaComponent},


  { path: 'informacoes-tecnicas', loadChildren: () => import('./pages/informacoes-tecnicas/informacoes-tecnicas.module').then(m => m.InformacoesTecnicasModule)},


  { path: ':cityName',  redirectTo: 'painel/SP/:cityName'},
  { path: ':state/:cityName',  redirectTo: 'painel/:state/:cityName'},
  { path: 'painel', loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule)},
  { path: '**', redirectTo: '/'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})]
})
export class AppRoutingModule { }
