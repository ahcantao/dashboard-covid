import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {SobreComponent} from './pages/sobre/sobre.component';
import {MidiaComponent} from './pages/midia/midia.component';
import {LiveComponent} from './pages/cravinhos/live/live.component';
import {InicioComponent} from './pages/inicio/inicio.component';


const routes: Routes = [
  { path: '',  component: InicioComponent},


  // { path: 'cravinhos',  component: CravinhosComponent},
  { path: 'live',  component: LiveComponent},

  { path: 'sobre',  component: SobreComponent},
  { path: 'na-midia',  component: MidiaComponent},


  { path: 'informacoes-tecnicas', loadChildren: () => import('./pages/informacoes-tecnicas/informacoes-tecnicas.module').then(m => m.InformacoesTecnicasModule)},

  { path: 'boletim/:cityName', redirectTo: 'boletim/:cityName'},
  { path: 'boletim', loadChildren: () => import('./pages/boletim/boletim.module').then(m => m.BoletimModule)},

  // { path: 'sertaozinho',  redirectTo: 'painel/sp/sertãozinho'},
  // { path: 'olimpia',  redirectTo: 'painel/sp/olímpia'},

  { path: ':cityName', redirectTo: 'painel/:cityName'},
  { path: ':state/:cityName',  redirectTo: 'painel/:state/:cityName'},
  { path: 'painel', loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule)},
  { path: '**', redirectTo: '/'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})]
})
export class AppRoutingModule { }
