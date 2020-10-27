import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';


import {ServiceWorkerModule, SwRegistrationOptions} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountupComponent } from './shared/countup/countup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';


import { NewsComponent } from './shared/news/news.component';
import {FormsModule} from '@angular/forms';
import { AnalisesComponent } from './pages/analises/analises.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { MidiaComponent } from './pages/midia/midia.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { CravinhosComponent } from './pages/cravinhos/cravinhos.component';
import { DataStudioComponent } from './pages/data-studio/data-studio.component';
import { LiveComponent } from './pages/cravinhos/live/live.component';
import { InicioComponent } from './pages/inicio/inicio.component';

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import * as Hammer from 'hammerjs';
import {ClickOutsideDirective} from './layouts/topbar/click-outside';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ChartsModule} from 'ng2-charts';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { enable: false },
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },

  };
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  };
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    LayoutComponent,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    CountupComponent,
    NewsComponent,
    AnalisesComponent,
    SobreComponent,
    MidiaComponent,
    MapaComponent,
    CravinhosComponent,
    DataStudioComponent,
    LiveComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      LeafletModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
      HammerModule,
      PopoverModule.forRoot(),
      // AccordionModule.forRoot(),
    RouterModule,
    PerfectScrollbarModule,
      FormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js'),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
