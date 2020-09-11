import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  menuActive: boolean = false;
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
      url: '/SP/Catanduva'
    },
    {
      title: 'Cravinhos/SP',
      url: '/SP/Cravinhos'
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

  constructor() { }

  deferredPrompt: any;
  showButton = false;

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
