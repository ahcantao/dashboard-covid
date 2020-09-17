import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['pt']);
      translate.setDefaultLang('pt');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/pt/) ? browserLang : 'pt');
  }
}
