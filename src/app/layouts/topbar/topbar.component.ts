import {Component, HostListener, OnInit} from '@angular/core';
import {HammerGestureConfig} from '@angular/platform-browser';
import {fromEvent} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {Router} from '@angular/router';
const hammerConfig = new HammerGestureConfig();


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit{

  ngOnInit() {
    const hammer=hammerConfig.buildHammer(document.documentElement);
    fromEvent(hammer, "swipe").pipe(
        takeWhile(()=>this.alive))
        .subscribe((res: any) => {

          if (res.deltaX<0){
            this.menuActive = false;
          } else {
            this.menuActive = true;
          }
        });
  }

  menuActive: boolean = false;
  alive:boolean=true;
  appPages: any = [
    {
      title: 'Início',
      url: '/'
    },
    // {
    //   title: 'Análises',
    //   url: '/analises'
    // },
    // {
    //   title: 'Mapa de calor',
    //   url: '/mapa-calor'
    // },

    {
      title: 'Catanduva/SP',
      url: 'painel/SP/Catanduva'
    },
    {
      title: 'Cravinhos/SP',
      url: 'painel/SP/Cravinhos'
    },
    {
      title: 'Informações técnicas',
      url: '/informacoes-tecnicas'
    },
    {
      title: 'Na mídia',
      url: '/na-midia'
    },
    {
      title: 'Sobre',
      url: '/sobre'
    }
  ];

  constructor(
      private router: Router
  ) { }

  deferredPrompt: any;
  showButton = false;

  goToPage(url: string){
    this.closeMenu();
    this.router.navigateByUrl(url);
  }

  closeMenu(){

    this.menuActive = false;

  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    if (this.deferredPrompt != undefined) {
      // hide our user interface that shows our A2HS button
      this.showButton = false;
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            this.deferredPrompt = null;

          });
    }
  
}
}
