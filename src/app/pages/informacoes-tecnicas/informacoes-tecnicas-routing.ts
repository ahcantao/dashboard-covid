import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InformacoesTecnicasComponent} from './informacoes-tecnicas.component';


const routes: Routes = [
    { path: '', component: InformacoesTecnicasComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InformacoesTecnicasRouting { }
