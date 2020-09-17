import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InformacoesTecnicasComponent} from './informacoes-tecnicas.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {InformacoesTecnicasRouting} from './informacoes-tecnicas-routing';



@NgModule({
    declarations: [InformacoesTecnicasComponent],
    exports: [

    ],
    imports: [
        CommonModule,
        InformacoesTecnicasRouting,
        AccordionModule.forRoot()
    ],

})
export class InformacoesTecnicasModule { }
