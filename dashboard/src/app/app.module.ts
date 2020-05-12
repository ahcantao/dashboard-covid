import { BrowserModule } from '@angular/platform-browser';
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
import {CityComponent} from "./pages/city/city.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  };
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,TopbarComponent, NavbarComponent, FooterComponent, CityComponent, NotFoundComponent, CountupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,CommonModule,
    RouterModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js'),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers:[{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }