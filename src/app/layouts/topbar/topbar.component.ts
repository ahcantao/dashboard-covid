import {Component, HostListener, OnInit} from '@angular/core';
import {HammerGestureConfig} from '@angular/platform-browser';
// import {fromEvent} from 'rxjs';
// import {takeWhile} from 'rxjs/operators';
import {Router} from '@angular/router';
// const hammerConfig = new HammerGestureConfig();


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent  {
  //
  // ngOnInit() {
  //   const hammer=hammerConfig.buildHammer(document.documentElement);
  //   fromEvent(hammer, "swipe").pipe(
  //       takeWhile(()=>this.alive))
  //       .subscribe((res: any) => {
  //
  //         if (res.deltaX<0){
  //           this.menuActive = false;
  //         } else {
  //           this.menuActive = true;
  //         }
  //       });
  // }

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string): void {

    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
          && Math.abs(direction[0]) > 20 // Long enough
          && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? false : true;

        this.menuActive = swipe;
      }
    }
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
      title: 'Sertãozinho/SP',
      url: 'painel/SP/Sertãozinho'
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
  showButton =  ! JSON.parse(window.localStorage.getItem("installed"));

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
    window.localStorage.setItem("installed", 'true');
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
